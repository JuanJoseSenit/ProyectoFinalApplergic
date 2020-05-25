const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

var ProductoSchema = new mongoose.Schema({
    id:{
        type:String, 
        required:true
    },
    nombre:{
        type:String,
        required:true
    },
    compania:{
        type:String,
        default:""
    },
    ingredientes:{
        type:String,
        default:""
    },
    alergenos:{
        type:Array,
        default:[]
    },
    foto:{
        type:String,
        default:""
    },
    codigo:{
        type:Object,
        required:true,
    },
    fechaCreacion:{
        type:Date,
        default:Date.now()
    },
    meGusta:{
        type:Number,
        default:0
    },
    compartido:{
        type:Number,
        default:0
    }
}, {collection:'Productos'})

const Producto = mongoose.model('Producto',ProductoSchema)

module.exports = Producto