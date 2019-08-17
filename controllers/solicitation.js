const Solicitation = require('../models/solicitation')
const { validationResult } = require('express-validator/check');

const index = async (req, res) => {
    console.log('dd')
    const results = await Solicitation.find()
    console.log(results)
    res.json(results)
}

const partial = async (req, res) => {
    //checar se tem token
    //se já tiver, só atualiza os dados
    console.log(req.body.token)
    if (req.body.token == undefined) {
        //salvar uma nova solicitação
        console.log('não tem token')
        try {
            const { name, email, cpf, birthdate, phone } = req.body
            const solicitation = new Solicitation({ name, email, cpf, birthdate, phone })
            await solicitation.save()
            res.json({
                success: true,
                token: solicitation._id,
                data: solicitation
            })
        } catch (e) {
            res.json({ errors: Object.keys(e.errors) })
        }
    } else {
        //tenho que atualizar os dados
        try {
            console.log(req.body.token)
            const solicitation = await Solicitation.findById(req.body.token)
            solicitation.name = req.body.name
            solicitation.email = req.body.email
            solicitation.cpf = req.body.cpf
            solicitation.birthdate = req.body.birthdate
            solicitation.phone = req.body.phone

            await solicitation.save()
            res.json({
                success: true,
                token: solicitation._id,
                data: solicitation
            })
        } catch (e) {
            res.json({ errors: Object.keys(e.errors) })
        }
    }
}

const final = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const solicitation = await Solicitation.findById(req.body.token)
            solicitation.name = req.body.name
            solicitation.email = req.body.email
            solicitation.cpf = req.body.cpf
            solicitation.birthdate = req.body.birthdate
            solicitation.phone = req.body.phone
            solicitation.complete = true
            solicitation.date = new Date()

            await solicitation.save()
            res.json({
                success: true,
                token: solicitation._id,
                data: solicitation
            })
        } catch (e) {
            res.json({ errors: Object.keys(e.errors) })
        }
    } else {
        return res.status(422).json(errors.array());
    }
}

module.exports = {
    index,
    partial,
    final
}