const express = require('express')
const router = express.Router()

const restauracionController = require('../controllers/restauracionController')
const authorizationController = require('../controllers/authorizationController')

router.route('/crud/:id(*)')
      .all(authorizationController.parseToken,authorizationController.verifyToken)
      .get(restauracionController.getRestauracion,restauracionController.listaRestauracion)
      .post(restauracionController.addRestauracion,restauracionController.addRestauracions)
      .put(restauracionController.modifyRestauracion)
      .delete(restauracionController.deleteRestauracion)
 
router.route('/filtrar')
      .post(restauracionController.filtrarRestauracion)

router.route('/buscar')
      .post(authorizationController.parseToken,authorizationController.verifyToken,restauracionController.getRestauraciones)

module.exports = router