const mongoose = require('mongoose')
const solicitationSchema = mongoose.Schema({
    productId:{
        type: Number 
    },
    name: {
        type: String
    },
    email: {
        type: String
    },
    cpf:{
        type: String
    },
    birthdate:{ 
        type: Date
    },
    phone:{
        type: String
    },
    complete:{
        type: Boolean,
        default:false
    },
    date:{ 
        type: Date
    }
})

const Solicitation = mongoose.model('Solicitation', solicitationSchema)
module.exports = Solicitation