const mongoose = require('mongoose');
const config = require('../app-config.json');

/**
 * Esta función devuelve una promesa que vamos a usar cada vez
 * que tengamos que conectar a la base de datos
 * 
 * @returns Promise
 */
const mongooseConnect = () => mongoose.connect(config.db.uri, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})

/**
 * @async
 * @param {*} Model
 * @param {*} data
 * @returns Model instance
 */
const createElement = async (Model, data) => {

    try {
        const modelInstance = new Model(data);
        await mongooseConnect()
        return await modelInstance.save()
    }
    catch (error) {
        console.log(error)
    }
}

/** 
 * @async
 * @param {*} Model 
 * @param {*} search 
 * @returns Model instance
 */
const readElement = async (Model, search) => {

    try {
        await mongooseConnect()
        return await Model.findOne(search)
    }
    catch (error) {
        console.log(error)
    }
}

/**
 * @async
 * @param {*} Model 
 * @param {*} search 
 * @param {*} changes 
 * @returns Model instance
 */
const updateElement = async (Model, search, changes) => {

    try {
        await mongooseConnect()
        return await Model.findOneAndUpdate(search, changes)
    }
    catch (error) {
        console.log(error)
    }
}

/**
 * @async
 * @param {*} Model 
 * @param {*} search 
 * @returns 
 */
const deleteElement = async (Model, search) => {

    try {
        await mongooseConnect()
        return await Model.remove(search)
    }
    catch (error) {
        console.log(error)
    }
}

/**
 * @async
 * @param {*} Model 
 * @param {*} search 
 * @returns array
 */
const listCollection = async (Model) => {
    try {
        await mongooseConnect()
        return await Model.find()
    }
    catch (error) {
        console.log(error)
    }
}
/**
 * @async
 * @param {*} Model 
 * @param {*} search 
 * @returns array
 */

const filterCollection = async(Model,search) =>{
    try{
        await mongooseConnect()
        return await Model.find(search)
    }
    catch{
        console.log(error)
    }
}

const mongooseCrud = {
    create: createElement,
    read: readElement,
    update: updateElement,
    delete: deleteElement,
    list: listCollection,
    filter: filterCollection
}

module.exports = mongooseCrud