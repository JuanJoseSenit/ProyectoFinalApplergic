const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const crud = require('../lib/mongooseCrud')
const Usuario = require('../models/Usuario')

/**
 * Este es el manejador al que passport llamará cuando
 * tenga que autenticar un usuario:
 * 
 * el primer parámetro será siempre el nombre de usuario,
 * que en nuestro caso será el email, el segundo parámetro
 * será la contraseña y el tercero una función que nos servirá
 * para pasar información del resultado de la operación
 */
const autenticarUsuario = async (email, password, done) => {

    /**
     * Esta función devuelve el usuario que coincide con el email facilitado
     * o undefined si no lo encuentra
     */
    const user = await crud.read(Usuario, { email: email })
    if (!user) {
        return done(null, false) // El usuario no existe en la bd
    }

    try {
        /**
         * Mediante este método comprobamos que la contraseña que tiene el usuario encontrado (que está encriptada)
         * coincide con la que se nos facilita desde el formulario de login
         */
        if (await bcrypt.compare(password, user.password)) {
            /** 
             *  El usuario que pasamos aquí es el que recibe la función serializeUsuario
             *  que hemos definido más abajo
             */            
            return done(null, user) // Contraseña correcta, las contraseñas coinciden 
        }
        else {
            return done(null, false) // Contraseña incorrecta, no coinciden  
        }
    }
    catch (err) {

        return done(err, false) // Se ha producido un error al descodificar la contraseña
    }
}

/**
 * Aquí es donde asignamos el manejador a nuestra estrategia:
 * elegimos como nombre de usuario el email
 */
passport.use(new LocalStrategy({ usernameField: 'email' }, autenticarUsuario))
