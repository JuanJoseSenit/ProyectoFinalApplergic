var express = require('express');
var router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'./uploads/usuarios/');
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

const authorizationController = require('../controllers/authorizationController')
const authenticationController = require('../controllers/authenticationController')

/* POST login and register. */
router.route('/login')
      .post(authenticationController.login,authorizationController.getToken);

router.route('/registro')
      .post(upload.single('foto'),authenticationController.register)

router.route('/perfil')
      .put(authorizationController.parseToken,authorizationController.verifyToken,upload.single("foto"),authenticationController.update)

router.route('/vuelta')
      .get(authorizationController.parseToken,authorizationController.verifyToken,authenticationController.getUser)

router.route('/logout')
      .put(authorizationController.parseToken,authorizationController.verifyToken,authenticationController.logout)

router.route('/logout')
      .put(authorizationController.parseToken,authorizationController.verifyToken,authenticationController.logout)

router.route('/password')
      .post(authenticationController.changePassword)

module.exports = router;
