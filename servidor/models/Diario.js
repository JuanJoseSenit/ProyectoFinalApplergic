const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

var DiarioSchema = new mongoose.Schema({
    id:{
        type:String, 
        required:true
    },
    titulo:{
        type:String,
        default:""
    },
    tipo:{
        type:String,
        default:"Texto"
    },
    fechaCreacion:{
        type:Date,
        default:Date.now()
    },
    texto:{
        type:String,
        required:true,
        default:""
    },
    sobre:{
        type:Object,
        required:true,
    },
    idUsuario:{
        type:String,
        required:true,
        default:""
    }
}, {collection:'Diario'})

const Diario = mongoose.model('Diario',DiarioSchema)

module.exports = Diario