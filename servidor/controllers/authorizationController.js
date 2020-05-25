const config = require('../app-config.json');
const jwt = require('jsonwebtoken');
const crud = require('../lib/mongooseCrud');
const Usuario = require('../models/Usuario');

const getToken = (req, res, next) => {
    jwt.sign({
        email: req.user.email,
        userId: req.user.id
    }, config.api.secret, { expiresIn: '1d' }, async (err, token) => {
        user = req.user;
        user2 = await crud.update(Usuario, {
            id:user.id
        },{
            currentToken:token
        });
        res.json({ token, user });
    })
}

const parseToken = (req, res, next) => {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    } else {
        res.status(403).send({msg:"No hay token"})
    }
}

const verifyToken = (req, res, next) => {
    jwt.verify(req.token, config.api.secret, (err, authData) => {
        if (err) {
            res.status(403).send({msg:"Token caducado"})
        } else {
            next()
        }
    })
}

module.exports = {
    getToken,
    parseToken,
    verifyToken
}