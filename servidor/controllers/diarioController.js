var Diario = require('../models/Diario')
var Producto = require("../models/Producto")
var Comercio = require("../models/Comercio")
var Restauracion = require("../models/Restauracion")
const crud = require('../lib/mongooseCrud')

const getDiario = async (req,res,next) => {
    if(req.params.id) {
        let result = { info: 'diario no encontrado' }
        const diario = await crud.read(Diario,{ id: req.params.id })
        if(diario){
            let sobre = JSON.parse(diario.sobre)
            let objetoTipo = sobre.tipo
            let objetoId = sobre.id
            if(objetoTipo === "Producto") Model = Producto
            else if(objetoTipo === "Restaurante") Model = Restauracion
            else if(objetoTipo === "Comercio") Model = Comercio
            const producto = await crud.read(Model,{id:objetoId})
            diario.producto = producto
            result = diario
        }
        res.json(result)
    }
    else{
        next()
    }
}
const listaDiarios = async (req,res,next) =>{
    const diarios = await crud.list(Diario)
    res.json(diarios)
}
const addDiario = async (req,res,next) => {
    if(typeof req.body[Symbol.iterator] !== 'function'){
        const diario = await crud.create(Diario, req.body)
        res.json(diario)
    }
    else{
        next()
    }
}
const addDiarios = async (req,res,next) => {
    let result = []
    for (diario of req.body){
        const diarioSalvado = await crud.create(Diario,diario)
        result.push(diarioSalvado)
    }
    res.json(result)
}
const modifyDiario = async (req,res,next) => {
    let result = { info: 'diario no encontrado' }
    const Diario = await crud.update(Diario, { id: req.params.id }, req.body)
    if(diario){
        result = diario
    }
    res.json(result)
}
const deleteDiario = async (req, res, next) => {
    let result = { info: 'diario no encontrado' }
    const diario = await crud.delete(Diario, { id: req.params.id }, req.body)
    if(diario){
        result = diario
    }
    res.json(result)
}
const getDiarios = async(req,res,next)=>{
    let result = { info: 'producto no encontrado' }
    let lista = []
    let idDiarios = req.body.diary;
    let diario;
    for(let id of idDiarios){
        diario = await crud.read(Diario,{ id })
        let sobre = JSON.parse(diario.sobre)
        let objetoTipo = sobre.tipo
        let objetoId = sobre.id
        if(objetoTipo === "Producto") Model = Producto
        else if(objetoTipo === "Restaurante") Model = Restauracion
        else if(objetoTipo === "Comercio") Model = Comercio
        const producto = await crud.read(Model,{id:objetoId})
        let result = {diario,producto}
        lista.push(result)
    }
    if(lista !== []){
        result = lista
    }
    res.json(lista)
}
 
module.exports = {
    getDiario,
    listaDiarios,
    addDiario,
    addDiarios,
    modifyDiario,
    deleteDiario,
    getDiarios
}