var Comercio = require('../models/Comercio')
const crud = require('../lib/mongooseCrud')

const getComercio = async (req,res,next) => {
    if(req.params.id) {
        let result = { info: 'comercio no encontrado' }
        const comercio = await crud.read(Comercio,{ id: req.params.id })
        if(comercio){
            result = comercio
        }
        res.json(comercio)
    }
    else{
        next()
    }
}
const listaComercios = async (req,res,next) =>{
    const comercios = await crud.list(Comercio)
    res.json(comercios)
}
const addComercio = async (req,res,next) => {
    if(typeof req.body[Symbol.iterator] !== 'function'){
        const comercio = await crud.create(Comercio, req.body)
        res.json(comercio)
    }
    else{
        next()
    }
}
const addComercios = async (req,res,next) => {
    let result = []
    for (comercio of req.body){
        const comercioSalvado = await crud.create(Comercio,comercio)
        result.push(comercioSalvado)
    }
    res.json(result)
}
const modifyComercio = async (req,res,next) => {
    let result = { info: 'comercio no encontrado' }
    const comercio = await crud.update(Comercio, { id: req.params.id }, req.body)
    if(comercio){
        result = comercio
    }
    res.json(result)
}
const deleteComercio = async (req, res, next) => {
    let result = { info: 'comercio no encontrado' }
    const comercio = await crud.delete(Comercio, { id: req.params.id }, req.body)
    if(comercio){
        result = comercio
    }
    res.json(result)
}

const filtrarComercio = async(req,res,next)=>{
    let result = {info: "No hay datos"}
    const comercios = await crud.read(Comercio,req.body)
    if(comercios.length > 0){
        result = comercios
    }
    res.json(result)
}

const getComercios = async(req,res,next)=>{
    let result = { info: 'producto no encontrado' }
    let lista = []
    let idComercios = req.body;
    let comercio;
    for(let id of idComercios){
        comercio = await crud.read(Comercio,{ id })
        lista.push(comercio)
    }
    if(lista !== []){
        result = lista
    }
    res.json(lista)
}

module.exports = {
    getComercio,
    listaComercios,
    addComercio,
    addComercios,
    modifyComercio,
    deleteComercio,
    filtrarComercio,
    getComercios
}