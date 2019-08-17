const solicitationController = require('../controllers/solicitation')
const { check } = require('express-validator/check');

const express = require('express')
const router = express.Router()

router.get('/', solicitationController.index)
router.post('/partial', solicitationController.partial)
router.post('/final', [
    check('name').not().isEmpty().withMessage('Name must have more than 5 characters'),
    check('email', 'Your email is not valid').not().isEmpty(),
], solicitationController.final)

module.exports = router