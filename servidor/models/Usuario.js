const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

var UsuarioSchema = new mongoose.Schema({
    id:{
        type:String, 
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String, 
        required:true, 
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    telefono:{
        type:String, 
        required:true
    },
    foto:{
        type:String,
        default:""
    },
    password:{
        type:String, 
        required:true
    },
    contactoNombre:{
        type:String,
        default:""
    },
    contactoEmail:{
        type:String,
        default:""
    },
    contactoTelefono:{
        type:String,
        default:""
    },
    aseguradora:{
        type:String,
        default:""
    },
    poliza:{
        type:String,
        default:""
    },
    alergias:{
        type:Array, 
        required:true
    },
    fechaCreacion:{
        type:Date,
        default:new Date().toISOString(),
        required:true
    },
    currentToken:{
        type:String,
        default:null
    },
    favoritos:{
        type:String,
        default:'{"Producto":{},"Restaurante":{},"Comercio":{}}',
        required:true
    },
    diario:{
        type:Array,
        default:[],
        required:true
    },
    valoracion:{
        type:Number,
        default:0
    }
}, {collection:'Usuarios'})
const Usuario = mongoose.model('Usuario',UsuarioSchema)

module.exports = Usuario