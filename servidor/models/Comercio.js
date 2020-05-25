const mongoose = require('mongoose')
mongoose.set('useCreateIndex',true)

var ComercioSchema = new mongoose.Schema({
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
    productos:{
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
}, {collection:'Comercios'})

const Comercio = mongoose.model('Comercio',ComercioSchema)

module.exports = Comercio