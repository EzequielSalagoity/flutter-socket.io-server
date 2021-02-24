// path: api/usuarios

const {Router, response} = require('express');
const { validarJWT } = require('../middlewares/validar-JWT');
const {getUsuarios} = require('../controlers/usuarios');

const router = Router();

// validar JWT
router.get('/', validarJWT, getUsuarios);


module.exports = router;