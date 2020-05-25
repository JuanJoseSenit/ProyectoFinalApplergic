var Producto = require('../models/Producto')
const crud = require('../lib/mongooseCrud')

const getProducto = async (req,res,next) => {
    if(req.params.id) {
        let result = { info: 'Producto no encontrado' }
        const producto = await crud.read(Producto,{ id: req.params.id })
        if(producto){
            result = producto
        }
        res.json(producto)
    }
    else{
        next()
    }
}
const listaProductos = async (req,res,next) => {
    const productos = await crud.list(Producto);
    res.json(productos)
}
const addProducto = async (req,res,next) => {
    if(typeof req.body[Symbol.iterator] !== 'function'){
        let prod = req.body
        prod["foto"] = req.file.path
        const producto = await crud.create(Producto, prod)
        res.json(producto)
    }
    else{
        next()
    }
}
const addProductos = async (req,res,next) => {
    let result = []
    for (producto of req.body){
        const productoSalvado = await crud.create(Producto,producto)
        result.push(productoSalvado)
    }
    res.json(result)
}
const modifyProducto = async (req,res,next) => {
    let result = { info: 'producto no encontrado' }
    const producto = await crud.update(Producto, { id: req.params.id }, req.body)
    if(producto){
        result = producto
    }
    res.json(result)
}
const deleteProducto = async (req, res, next) => {
    let result = { info: 'producto no encontrado' }
    const producto = await crud.delete(Producto, { id: req.params.id }, req.body)
    if(producto){
        result = producto
    }
    res.json(result)
}

const filtrarProducto = async (req,res,next)=>{
    let result = { info: 'producto no encontrado' }
    const producto = await crud.read(Producto,{ codigo: req.body })
    if(producto){
        result = producto
    }
    res.json(result)
}

const getProductos = async (req,res,next)=>{
    let result = { info: 'producto no encontrado' }
    let lista = []
    let idProductos = req.body;
    let producto;
    for(let id of idProductos){
        producto = await crud.read(Producto,{ id })
        lista.push(producto)
    }
    if(lista !== []){
        result = lista
    }
    res.json(lista)
}

module.exports = {
    getProducto,
    listaProductos,
    addProducto,
    addProductos,
    modifyProducto,
    deleteProducto,
    filtrarProducto,
    getProductos
}