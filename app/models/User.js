const mongoose = require('../../src/database');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    cpf: {
        unique: true,
        type: String,
        require: true,
    },
    escolaridade: {
        type: String,
    },
    fone: {
        type: String,
        require: true,
    },
    sexo: {
        type: String,
        require: true,
    },
    peso: {
        type: Number,
        require: true,
    },
    altura: {
        type: Number,
        require: true,
    },
    dtNasc: {
        type: Date,
        require: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    passwordResetToken: {
        type: String,
        select: false,
    },
    passwordResetExpires: {
        type: Date,
        select: false,
    },
    admin:{
        type: Boolean,
        default: false
    },
    frmDadosHosp: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frmDadosHosp',
    },
    frmInterCorrencias: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frmInterCorrencias',
    },
    frmPreCirurgico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frmPreCirurgico',
    },
    frmPosCirurgico: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frmPosCirurgico',
    },
    frmFeedback: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'frmFeedback',
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;

    next();
})

const User = mongoose.model('User', UserSchema);

module.exports = User;