const port = process.env.PORT || 3000

const mongoose = require('mongoose')
const mongo = `mongodb+srv://leonardo:${process.env.MONGODB}@teste-backend-foregon-cymke.mongodb.net/test?retryWrites=true&w=ma` || 'mongodb://localhost:27017/teste-backend-foregon'
//para o mongose usar as promise padrão do node
//leonardo:EQpQRTaAFDBcoUGr
mongoose.Promise = global.Promise

const app =require('./app')

mongoose.connect(mongo, { useNewUrlParser: true }).then(() => {
    app.listen(port, () => {
        console.log('Servidor rodando na porta: ' + port)
    })
}).catch((e) => {
    console.log('Não possível conectar ao banco de dados, erro: ' + e)
})