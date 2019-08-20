const Solicitation = require('../models/solicitation')
const { validationResult } = require('express-validator')
const moment = require('moment')
const { extractErrors } = require('../utils/index')

//salvar as solicitações parcialmente
//esse endpoint não contém nenhuma validação de negócio
const partial = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        //checar se tem token
        //se já tiver, só atualiza os dados
        if (req.body.token == undefined) {
            //salvar uma nova solicitação
            const { product, name, email, cpf, birthdate, phone } = req.body
            const solicitation = new Solicitation({ productId: product, name, email, cpf, birthdate, phone })
            await solicitation.save()
            res.status(201).json({
                success: true,
                title: 'Salvo com sucesso.',
                status: 201,
                token: solicitation._id
            })
        } else {
            //tenho que atualizar os dados
            const solicitation = await Solicitation.findById(req.body.token)
            solicitation.productId = req.body.product
            solicitation.name = req.body.name
            solicitation.email = req.body.email
            solicitation.cpf = req.body.cpf
            solicitation.birthdate = req.body.birthdate
            solicitation.phone = req.body.phone

            await solicitation.save()
            res.status(200).json({
                success: true,
                title: 'Atualizado com sucesso.',
                status: 200,
                token: solicitation._id
            })
        }
    } else {
        //erro na validação dos dados
        return res.status(400).json({
            success: false,
            title: 'Erro na validação de um ou mais campos.',
            status: 400,
            errors: extractErrors(errors.array())
        });
    }
}

//quando o usuário completa a solicitação
//retirar essa proposta da coleção de propostas incompletas e mover ela pra 
//uma coleção de propostas completas.
const final = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {

        //verificar se já tem solicitação com esse cpf
        const solicitations = await Solicitation
            .findOne({ cpf: req.body.cpf, complete: true })
            .sort({ date: -1 })

        const difference = solicitations? moment().diff(solicitations.date, 'days') : 100
        
        if (difference >= 90) {
            const solicitation = await Solicitation.findById(req.body.token)
            solicitation.productId = req.body.product
            solicitation.name = req.body.name
            solicitation.email = req.body.email
            solicitation.cpf = req.body.cpf
            solicitation.birthdate = req.body.birthdate
            solicitation.phone = req.body.phone
            solicitation.complete = true
            solicitation.date = new Date()

            await solicitation.save()
            res.status(201).json({
                success: true,
                token: solicitation._id,
                title: 'Solicitação criada com sucesso.',
                status: 201
            })
        } else {
            //após uma solicitação, um mesmo CPF não pode ter uma nova proposta por 90 dias.
            return res.status(400).json({
                success: false,
                title: 'Um mesmo CPF não pode ter uma nova proposta por 90 dias.',
                status: 400,
                errors: []
            });
        }
    } else {
        //erro na validação dos dados
        return res.status(400).json({
            success: false,
            title: 'Erro na validação de um ou mais campos.',
            status: 400,
            errors: extractErrors(errors.array())
        });
    }
}

module.exports = {
    partial,
    final
}