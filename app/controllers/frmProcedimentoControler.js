const express = require("express");
const authMiddleware = require('../middlewares/auth');

const FrmProcedimento = require('../models/FrmProcedimento');

const router = express.Router();

router.use(authMiddleware);

router.get('/:frmProcedimentoId', async (req, res) => {
    try {
        const frmProcedimento = await FrmProcedimento.findById(req.params.frmProcedimentoId).populate('patient');
        return res.send({ frmProcedimento });

    } catch (err) {
        return res.status(400).send({ error: 'Error loading form Pre Cirurgico' });
    }

});

router.post('/', async (req, res) => {
    try {
        const { numeroProtocolo, nomeHospital, nomeMedico, crmMedico, dtRealizacao, modoRealizado } = req.body;

        const frmProcedimento = await FrmProcedimento.create({ numeroProtocolo, nomeHospital, nomeMedico, crmMedico, dtRealizacao, modoRealizado, patient: req.userId });

        return res.send({ frmProcedimento })

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: 'Error creating new form Pre Cirurgico' });
    }
});

router.put('/:frmProcedimentoId', async (req, res) => {
    try {
        const {  numeroProtocolo, nomeHospital, nomeMedico, crmMedico, dtRealizacao, modoRealizado } = req.body;
        await FrmProcedimento.findByIdAndUpdate(req.params.frmProcedimentoId, {
            '$set': {
                numeroProtocolo: numeroProtocolo,
                nomeHospital: nomeHospital,
                nomeMedico: nomeMedico,
                crmMedico: crmMedico,
                dtRealizacao: dtRealizacao,
                modoRealizado: modoRealizado,
            }
        });
        return res.send();

    } catch (err) {
        console.log(err)
        return res.status(400).send({ error: "We can't update form Pre Cirurgico" });
    }
});

router.delete('/:frmProcedimentoId', async (req, res) => {
    try {
        await FrmProcedimento.findByIdAndRemove(req.params.frmProcedimentoId);
        return res.send();

    } catch (err) {

        return res.status(400).send({ error: "We can't form Pre Cirurgico" });
    }

});

module.exports = app => app.use('/procedimento', router);

