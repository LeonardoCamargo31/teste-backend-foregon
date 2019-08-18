const express = require('express')
const router = express.Router()
const { check } = require('express-validator');
const { isValidDate, validateCPF, validateMinAge, validateMaxAge } = require('../utils/index')
const solicitationController = require('../controllers/solicitation')

router.get('/', solicitationController.index)
router.post('/partial', [
    check('product')
        .optional().isDecimal().withMessage('O id do produto deve ser um inteiro'),
    check('name')
        .optional().isLength({ min: 5 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
    check('email')
        .optional().isEmail().withMessage('E-mail inválido'),
], solicitationController.partial)

router.post('/final', [
    check('token')
        .not().isEmpty().withMessage('Deve informar o token'),
    check('product')
        .not().isEmpty().withMessage('Informe o id do produto.')
        .isDecimal().withMessage('O id do produto deve ser um inteiro'),
    check('name')
        .not().isEmpty().withMessage('Informe o campo nome.')
        .isLength({ min: 5 }).withMessage('Nome deve ter pelo menos 5 caracteres'),
    check('email')
        .not().isEmpty().withMessage('Informe o campo e-mail.')
        .isEmail().withMessage('E-mail inválido'),
    check('cpf')
        .not().isEmpty().withMessage('Informe o campo cpf.')
        .custom(validateCPF).withMessage('Cpf invalido'),
    check('birthdate')
        .not().isEmpty().withMessage('Informe o campo birthdate.')
        .custom(isValidDate).withMessage('Data invalida')
        .custom(validateMinAge).withMessage('Menor de 18 anos')
        .custom(validateMaxAge).withMessage('Maior de 65 anos'),
    check('phone')
        .not().isEmpty().withMessage('Informe o campo phone.'),
], solicitationController.final)

module.exports = router