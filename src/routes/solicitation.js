const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const { isValidDate, validateCPF, validateMinAge, validateMaxAge, validatePhone} = require('../utils/index')
const solicitationController = require('../controllers/solicitation')

router.post('/partial', [
    check('product')
        .optional().isDecimal().withMessage('O produto deve ser um inteiro.'),
    check('name')
        .optional().isLength({ min: 5 }).withMessage('Nome deve ter pelo menos 5 caracteres.'),
    check('email')
        .optional().isEmail().withMessage('E-mail inválido'),
    check('cpf')
        .optional().custom(validateCPF).withMessage('CPF inválido.'),
    check('birthdate').optional()
        .custom(isValidDate).withMessage('Data de nascimento inválida, a data deve ser informada no formato aaaa-mm-dd.')
        .custom(validateMinAge).withMessage('Data de nascimento menor de 18 anos.')
        .custom(validateMaxAge).withMessage('Data de nascimento maior de 65 anos.'),
    check('phone').optional()
        .custom(validatePhone).withMessage('Numero de telefone inválido.'),
], solicitationController.partial)

router.post('/final', [
    check('token')
        .not().isEmpty().withMessage('Token é obrigatório.'),
    check('product')
        .not().isEmpty().withMessage('Produto é obrigatório.')
        .isDecimal().withMessage('O produto deve ser um inteiro.'),
    check('name')
        .not().isEmpty().withMessage('Nome é obrigatório.')
        .isLength({ min: 5 }).withMessage('Nome deve ter pelo menos 5 caracteres.'),
    check('email')
        .not().isEmpty().withMessage('E-mail é obrigatório.')
        .isEmail().withMessage('E-mail inválido.'),
    check('cpf')
        .not().isEmpty().withMessage('CPF é obrigatório.')
        .custom(validateCPF).withMessage('CPF inválido.'),
    check('birthdate')
        .not().isEmpty().withMessage('Data de nascimento é obrigatória.')
        .custom(isValidDate).withMessage('Data de nascimento inválida, a data deve ser informada no formato aaaa-mm-dd.')
        .custom(validateMinAge).withMessage('Data de nascimento menor de 18 anos.')
        .custom(validateMaxAge).withMessage('Data de nascimento maior de 65 anos.'),
    check('phone')
        .not().isEmpty().withMessage('Numero de telefone é obrigatório.')
        .custom(validatePhone).withMessage('Numero de telefone inválido.'),
], solicitationController.final)

module.exports = router