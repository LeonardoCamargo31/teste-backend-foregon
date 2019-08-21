const solicitationRoute = require('./solicitation')
const authRoute  = require('./auth')

//precisamos de um middleware para interceptar, antes de chegar em /reseller passa pelo middleware
//e vamos pegar o req e verificar se o token é valido
const authMiddleware = require('../middlewares/auth');

const init = () => {
    const express = require('express')
    const router = express.Router()
    
    router.use('/register',authRoute)
    router.use(authMiddleware)
    router.use('/', solicitationRoute)

    return router
}

module.exports = init