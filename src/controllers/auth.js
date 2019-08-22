const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { validationResult } = require('express-validator')
const User = require('../models/user')
const authConfig = require('../config/auth')
const { extractErrors } = require('../utils/index')

//agora vamos gerar nosso token
function generateToken(params = {}) {
    //passamos a informação que difere um usuario do outro, e o hash que precisa ser unico
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,//tempo de expiração, deixamos para um dia 86400 segundos
    });
}

const register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, password } = req.body
        try {
            //buscar usuario pelo email, se já existir
            if (!await User.findOne({ email })) {
                const user = await User.create({ name, email, password })//await espera finalizar isso para continuar o fluxo
                user.password = undefined//assim não exibe a senha

                return res.status(201).json({
                    success: true,
                    title: 'Usuário criado com sucesso.',
                    status: 201
                })
            } else {
                return res.status(400).json({
                    success: false,
                    title: 'Esse usuário já está existe.',
                    status: 400,
                    errors: []
                });
            }
        } catch (e) {
            return res.status(500).json({
                success: false,
                title: 'Ocorreu um erro interno.',
                status: 500,
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


const authenticate = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { email, password } = req.body
        //buscar usuario pelo email, se já existir
        const user = await User.findOne({ email }).select('+password')//.select('+password') assim tb seleciono o meu passowrd que tinhamos definido de não vir
        if (!user) {
            return res.status(400).json({
                success: false,
                title: 'Usuário não encontrado.',
                status: 400
            })
        }

        //comparando as senhas, para isso uso o bcrypt, criptografando a senha informada
        //await pois é uma função assincrona
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).json({
                success: false,
                title: 'Senha inválida.',
                status: 400
            })
        }
        user.password = undefined//assim não exibe a senha
        //cada vez gera um token diferente, pois se baseia no timestamp
        return res.status(200).json({
            success: true,
            title: 'Usuário autenticado com sucesso.',
            token: generateToken({ id: user.id }),
            status: 200
        })
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
    register,
    authenticate
}