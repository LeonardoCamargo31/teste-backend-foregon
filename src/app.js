const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index')
const app = express()

//middleware que faz o processamento do corpo da requisição
app.use(bodyParser.json({ extended: true }))
app.use(router())
app.use(cors())//para todas as origens

module.exports = app