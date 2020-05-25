const express = require('express')
const router = express.Router()

const comercioController = require('../controllers/comercioController')
const authorizationController = require('../controllers/authorizationController')

router.route('/crud/:id(*)')
      .all(authorizationController.parseToken,authorizationController.verifyToken)
      .get(comercioController.getComercio,comercioController.listaComercios)
      .post(comercioController.addComercio,comercioController.addComercios)
      .put(comercioController.modifyComercio)
      .delete(comercioController.deleteComercio)

router.route("/filtrar")
      .post(comercioController.filtrarComercio)

router.route("/buscar")
      .post(authorizationController.parseToken,authorizationController.verifyToken,comercioController.getComercios)


module.exports = router