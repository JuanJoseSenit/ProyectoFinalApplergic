const passport = require('passport');
const config = require('../app-config.json');
const bcrypt = require('bcrypt');
const crud = require('../lib/mongooseCrud');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

/**
 * authenticate es un middleware que recoge y procesa la petición POST
 * aquí le señalamos que usaremos una estrategia local;
 * el manejador que usamos esta vez es al que se llama cuando usamos done()
 * al definir la estrategia
 */
const login = function (req, res, next) {

    passport.authenticate('local', function(err, user, info) {
        if (err) { 
            res.json({error:err})
        }
        else if(user===false) { 
            return res.json({ info: info, error: "Usuario y/o contraseña no válidos" }) 
        }
        req.user = user
        return next()
    })(req, res, next)
}

const register = async function (req, res, next) {
    /**
     * Al recibir por POST el formulario de registro
     * lo primero que tenemos que hacer es encriptar 
     * la contraseña facilitada
     */
    let perfil = req.body;

    const exists = await crud.read(Usuario,{email:perfil.email})
    if(exists === [] || exists === {} || exists === null){
        bcrypt.hash(perfil.password, 10, async (err, hash) => {
            let path = ""
            if(req.file) path = req.file.path
            let objIni = {"Producto":{},"Restaurante":{},"Comercio":{}}
            const user = await crud.create(Usuario, {
                id:perfil.id,
                nombre:perfil.nombre,
                email:perfil.email,
                telefono:perfil.telefono,
                foto:path,
                password:hash,
                contactoNombre:perfil.contactoNombre,
                contactoEmail:perfil.contactoEmail,
                contactoTelefono:perfil.contactoTelefono,
                aseguradora:perfil.aseguradora,
                poliza:perfil.poliza,
                alergias:perfil.alergias,
                favoritos:perfil.favoritos
            })
            res.json(user)
        })
    }
    else{
        res.json({info:"No puede realizarse registro",exists})
    }
}

const changePassword = function (req, res, next) {
    /**
     * Para cambiar la contraseña, el sistema solicitará
     * el correo electrónico y el teléfono
     * para luego aceptar el hash y realizar el update
     */
    bcrypt.hash(req.body.password, 10, async (err, hash) => {
        const user = await crud.update(Usuario, {
            email:req.body.email,
            telefono:req.body.telefono
        },{
            password:hash,
        })
        res.json(user)
    })
}

const getUser = async function(req,res,next){
    let result = { info: "usuario no encontrado" };
    let token = req.token;
    let decoded = await jwt.verify(token,config.api.secret)
    let id = decoded.userId
    const user = await crud.read(Usuario,{id})
    if(user) result = user
    res.json({result})
}

const update = async function(req,res,next) {
    let result = { info: "usuario no encontrado" }
    let values = req.body
    let cambio = {}
    for(let [key,value] of Object.entries(values)){
        if(key !== "id") cambio[key] = value
    }
    if(req.file) cambio[foto] = req.file.path
    const user = await crud.update(Usuario,{id:req.body.id},cambio)
    if(user) result = user
    res.json(result)
}

const logout = async function(req,res,next){
    let id = req.body.id
    const user = await crud.read(Usuario,{id})
    if(!user){
        return res.status(200).json({info: "El usuario no está autenticado."})
    }
    if(user.currentToken){
        const user = await crud.update(Usuario,{id},{currentToken:null})
        res.status(200).json({info: "Desconexión con éxito"})
    }
}

module.exports = {
    register,
    login,
    logout,
    changePassword,
    getUser,
    update
}