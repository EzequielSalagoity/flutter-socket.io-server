// path: /api/mensajes

const {Router} = require('express');
const { obtenerChat } = require('../controlers/mensajes');
const { validarJWT } = require('../middlewares/validar-JWT');

const router = Router();

// validar JWT
router.get('/:de', validarJWT, obtenerChat);

module.exports = router;