const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const router = require('./routes/index')
const app = express()
const morgan = require('morgan')
const path = require('path')
const fs = require('fs')

//criar um fluxo de gravação (no modo de anexação)
const accessLogStream = fs.createWriteStream(
    path.join(__dirname, 'logs/access.log'), { flags: 'a' }
)
//configurar log
app.use(morgan('combined', { stream: accessLogStream }))

//middleware que faz o processamento do corpo da requisição
app.use(bodyParser.json({ extended: true }))
app.use(router())
app.use(cors())//para todas as origens

module.exports = app