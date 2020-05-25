const express = require('express')
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/productos/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,".")+"-"+file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    //reject a file
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true) 
    }
    else{
        cb(null,false)
    }
}

const upload = multer({
    storage: storage, 
    limits:{
        fileSize: 1024*1024*5,
    },
    fileFilter: fileFilter
});

const productoController = require('../controllers/productoController')
const authorizationController = require('../controllers/authorizationController')

router.route('/crud/:id(*)')
      .all(authorizationController.parseToken,authorizationController.verifyToken)
      .get(productoController.getProducto,productoController.listaProductos)
      .post(upload.single('foto'),productoController.addProducto,productoController.addProductos)
      .put(productoController.modifyProducto)
      .delete(productoController.deleteProducto)

router.route("/filtrar")
      .post(productoController.filtrarProducto)

router.route("/buscar")
      .post(authorizationController.parseToken,authorizationController.verifyToken,productoController.getProductos)
      
module.exports = router