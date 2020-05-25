const express = require('express')
const router = express.Router()

const diarioController = require('../controllers/diarioController')
const authorizationController = require('../controllers/authorizationController')

router.route('/crud/:id(*)')
      .all(authorizationController.parseToken,authorizationController.verifyToken)
      .get(diarioController.getDiario,diarioController.listaDiarios)
      .post(diarioController.addDiario,diarioController.addDiarios)
      .put(diarioController.modifyDiario)
      .delete(diarioController.deleteDiario)
router.route("/filtrar/")
      .post(authorizationController.parseToken,authorizationController.verifyToken,diarioController.getDiarios)
module.exports = router