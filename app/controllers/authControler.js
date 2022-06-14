const express = require('express');
const User = require('../models/User');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../src/config/auth.json')
const crypto = require('crypto');
const mailer = require('../../src/modules/mailer')

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, { expiresIn: 3600 });
}

router.post('/register', async (req, res) => {
    try {
        const { email } = req.body;
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'User already exists' });
        const user = await User.create(req.body);

        user.password = undefined;

        return res.send({
            user,
            token: generateToken({ id: user.id }),
        });
    } catch (err) {
        return res.status(400).send({ error: 'Registration failed' });
    }
});

router.post('/authenticate', async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');

    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }
    if (!await bcrypt.compare(password, user.password)) {
        return res.status(400).send({ error: 'Invalid password' });
    }

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id })
    });
});

router.post('/forgot_password', async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).send({ error: 'User not found' });
        const token = crypto.randomBytes(20).toString('hex');

        const now = new Date();
        now.setHours(now.getHours() + 1);

        await User.findByIdAndUpdate(user.id, {
            '$set': {
                passwordResetToken: token,
                passwordResetExpires: now,
            }
        });

        mailer.sendMail({
            subject: "Email de Recuperação de Senha",
            to: email,
            from: 'jorgedev@yahoo.com',
            template: "auth/forgot_password",
            context: { token },
        }, (err) => {
            console.log(err)
            if (err) return res.status(400).send({ error: "Cannot send forgot password email" });
            return res.send("OK");
        })
        console.log("chegou até aqui");
        console.log(token, now);

    } catch (err) {
        console.log(err);
        res.status(400).send({ error: 'Erro on forgot password, try again' });
    }
});


router.post('/reset_password', async (req, res) => {
    const { email, token, password } = req.body;
    try {
        const user = await User.findOne({ email })
            .select('+passwordResetToken passwordResetExpires');

        if (!user)
            return res.status(400).send({ error: 'User not Found' })

        if (token !== user.passwordResetToken)
            return res.status(400).send({ error: "Invalid token" })

        const now = new Date();

        if (now > user.passwordResetExpires)
            return res.status(400).send({ error: "Token expired genearate a new one" })

        user.password = password;

        await user.save();

        res.send();

    } catch (err) {
        console.log(err)
        res.status(400).send({ error: 'Cannot reset password, try again' });
    }
});

module.exports = app => app.use('/auth', router);