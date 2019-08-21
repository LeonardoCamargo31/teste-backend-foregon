const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const authController = require('../controllers/auth')

router.post('/', [
    check('name')
        .not().isEmpty().withMessage('Nome é obrigatório.')
        .isLength({ min: 5 }).withMessage('Nome deve ter pelo menos 5 caracteres.'),
    check('email')
        .not().isEmpty().withMessage('E-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.'),
    check('password')
        .not().isEmpty().withMessage('Senha é obrigatória.')
], authController.register)

module.exports = router