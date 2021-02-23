/*
    path: api/login
*/


const {Router, response} = require('express');
const { check } = require('express-validator');
const {crearUsuario, login, renewToken} = require('../controlers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-JWT');


const router = Router();

router.post('/new', [
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],crearUsuario);

router.post('/', [
    check('email','El email es obligatorio').isEmail(),
    check('password','La contraseña es obligatorio').not().isEmpty(),
    validarCampos
],login);

// validar JWT
router.get('/renew', validarJWT, renewToken);


module.exports = router;