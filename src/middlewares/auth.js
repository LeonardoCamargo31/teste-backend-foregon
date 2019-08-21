const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

//next para chamar o proximo passo ou seja, esta tudo okay
module.exports = (req, res, next) => {
    //buscamos o header authorization
    const authHeader = req.headers.authorization
    if (!authHeader){//se não tiver um authHeader
        return res.status(401).json({
            success: false,
            title: 'Nenhum token fornecido.',
            status: 401,
            errors: []
        });
    }

    //verificar se o token esta no formato certo
    //sempre é assim Bearer fre4f4rfe54rf5rfew4fre4f98f
    const parts = authHeader.split(' ')

    //verificamos se esse token tem duas partes
    if (!parts.length === 2){
        return res.status(401).json({
            success: false,
            title: 'Token inválido.',
            status: 401,
            errors: []
        });
    }

    //então temos scheme=>Bearer e o token=> a hash
    const [scheme, token] = parts;

    //verificamos se scheme esta escrito Bearer
    //^ indica o inicio
    //$ indica o fim
    //i indica que é casesensitive
    if (!/^Bearer$/i.test(scheme)){
        return res.status(401).json({
            success: false,
            title: 'Token inválido.',
            status: 401,
            errors: []
        });
    }


    //ai se estiver okay, enviamos para validar
    //validamo o possivel para não gastar processamento com nossa verificação
    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                success: false,
                title: 'Token inválido.',
                status: 401,
                errors: []
            });
        }
        return next(); 
    });
};