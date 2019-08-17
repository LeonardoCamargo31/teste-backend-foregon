const solicitationRoute = require('./solicitation')

const init = () => {
    const express = require('express')
    const router = express.Router()

    router.use('/', solicitationRoute)

    return router
}

module.exports = init