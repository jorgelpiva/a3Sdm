const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmIntercorrencia = require('../models/FrmIntercorrencia');

const router = express.Router();

router.use(authMiddleware);

router.get('/:frmIntercorrenciaId', async (req, res) => {
    try {
        const frmIntercorrencia = await FrmIntercorrencia.findById(req.params.frmIntercorrenciaId).populate('patient');
        return res.send({ frmIntercorrencia });

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error loading frmIntercorrencias' });
    }

});

router.post('/', async (req, res) => {
    try {
        const { sintCpre, enjooVomit, dorEstomago, malEstar, suores, outros, outrosDesc, dorAbdomenEsq, dorAbdomenDir, dorAbdomen, sintomaPersiste, qualSintoma, novoSintoma, qualNovoSintoma, reposoDoisDias, complicacaoPosCirurgico, inflamacao, hemorragia, infeccao, outras, observacao } = req.body;

        const frmIntercorrencia = await FrmIntercorrencia.create({ sintCpre, enjooVomit, dorEstomago, malEstar, suores, outros, outrosDesc, dorAbdomenEsq, dorAbdomenDir, dorAbdomen, sintomaPersiste, qualSintoma, novoSintoma, qualNovoSintoma, reposoDoisDias, complicacaoPosCirurgico, inflamacao, hemorragia, infeccao, outras, observacao, patient: req.userId });
        return res.send({ frmIntercorrencia })

    } catch (err) {
        return res.status(400).send({ error: 'Error creating new frmIntercorrencia' });
    }
});

router.put('/:frmIntercorrenciaId', async (req, res) => {
    try {
        const { sintCpre, enjooVomit, dorEstomago, malEstar, suores, outros, outrosDesc, dorAbdomenEsq, dorAbdomenDir, dorAbdomen, sintomaPersiste, qualSintoma, novoSintoma, qualNovoSintoma, reposoDoisDias, complicacaoPosCirurgico, inflamacao, hemorragia, infeccao, outras, observacao } = req.body;
        await FrmIntercorrencia.findByIdAndUpdate(req.params.frmIntercorrenciaId, {
            '$set': {
                sintCpre: sintCpre,
                enjooVomit: enjooVomit,
                dorEstomago: dorEstomago,
                malEstar: malEstar,
                suores: suores,
                outros: outros,
                outrosDesc: outrosDesc,
                dorAbdomenEsq: dorAbdomenEsq,
                dorAbdomenDir: dorAbdomenDir,
                dorAbdomen: dorAbdomen,
                sintomaPersiste: sintomaPersiste,
                qualSintoma: qualSintoma,
                novoSintoma: novoSintoma,
                qualNovoSintoma: qualNovoSintoma,
                reposoDoisDias: reposoDoisDias,
                complicacaoPosCirurgico: complicacaoPosCirurgico,
                inflamacao: inflamacao,
                hemorragia: hemorragia,
                infeccao: infeccao,
                outras: outras,
                observacao: observacao
            }
        });
        return res.send();

    } catch (err) {
        return res.status(400).send({ error: "We can't update this frmIntercorrencia" });
    }
});

router.delete('/:frmIntercorrenciaId', async (req, res) => {
    try {
        await FrmIntercorrencia.findByIdAndRemove(req.params.frmIntercorrenciaId);
        return res.send();

    } catch (err) {
        return res.status(400).send({ error: "We can't delete this frmIntercorrencia" });
    }

});

module.exports = app => app.use('/intercorrencias', router);