const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

var RestauracionSchema = new mongoose.Schema({
    id:{
        type:String, 
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    tipo:{
        type:String,
        default:""
    },
    precioMedio:{
        type:Number,
        default:0
    },
    platos:{
        type:Array,
        default:[]
    },
    alergenos:{
        type:Array,
        default:[]
    },
    localizacion:{
        type:Object,
        required:true,
        default:{lat:0.000,lng:0.000}
    },
    fechaCreacion:{
        type:Date,
        default:new Date().toISOString()
    },
    meGusta:{
        type:Number,
        default:0
    },
    compartido:{
        type:Number,
        default:0
    }
}, {collection:'Restauracion'})

const Restauracion = mongoose.model('Restauracion',RestauracionSchema)

module.exports = Restauracion