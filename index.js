const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

const mongo = process.env.MONGODB || 'mongodb://localhost:27017/teste-backend-foregon'
const mongoose = require('mongoose')
//para o mongose usar as promise padrão do node
mongoose.Promise = global.Promise

//middleware que faz o processamento do corpo da requisição
app.use(bodyParser.json({ extended: true }))

const router = require('./routes/index')
app.use(router())

mongoose.connect(mongo, { useNewUrlParser: true }).then(() => {
    app.listen(port, () => {
        console.log('Servidor rodando na porta: ' + port)
    })
}).catch((e) => {
    console.log('Não possível conectar ao banco de dados, erro: ' + e)
})