var Restauracion = require('../models/Restauracion')
const crud = require('../lib/mongooseCrud')

const getRestauracion = async (req,res,next) => {
    if(req.params.id) {
        let result = { info: 'restauracion no encontrado' }
        const restauracion = await crud.read(Restauracion,{ id: req.params.id })
        if(restauracion){
            result = restauracion
        }
        res.json(restauracion)
    }
    else{
        next()
    }
}
const listaRestauracion = async (req,res,next) =>{
    const restaurantes = await crud.list(Restauracion)
    res.json(restaurantes)
}

const addRestauracion = async (req,res,next) => {
    if(typeof req.body[Symbol.iterator] !== 'function'){
        const restauracion = await crud.create(Restauracion, req.body)
        res.json(restauracion)
    }
    else{
        next()
    }
}
const addRestauracions = async (req,res,next) => {
    let result = []
    for (restauracion of req.body){
        const restauracionSalvado = await crud.create(Restauracion,restauracion)
        result.push(restauracionSalvado)
    }
    res.json(result)
}
const modifyRestauracion = async (req,res,next) => {
    let result = { info: 'restauracion no encontrado' }
    const Restauracion = await crud.update(Restauracion, { id: req.params.id }, req.body)
    if(restauracion){
        result = restauracion
    }
    res.json(result)
}
const deleteRestauracion = async (req, res, next) => {
    let result = { info: 'restauracion no encontrado' }
    const restauracion = await crud.delete(Restauracion, { id: req.params.id }, req.body)
    if(restauracion){
        result = restauracion
    }
    res.json(result)
}

const filtrarRestauracion = async(req,res,next)=>{
    let result = {info: "No hay datos"}
    const restaurantes = await crud.filter(Restauracion,req.body)
    if(restaurantes.length > 0){
        result = restaurantes
    }
    res.json(result)
}

const getRestauraciones = async(req,res,next)=>{
    let result = { info: 'producto no encontrado' }
    let lista = []
    let idRestaurantes = req.body;
    let restaurante;
    for(let id of idRestaurantes){
        restaurante = await crud.read(Restauracion,{ id })
        lista.push(restaurante)
    }
    if(lista !== []){
        result = lista
    }
    res.json(lista)
}

module.exports = {
    getRestauracion,
    listaRestauracion,
    addRestauracion,
    addRestauracions,
    modifyRestauracion,
    deleteRestauracion,
    filtrarRestauracion,
    getRestauraciones
}