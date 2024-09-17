//importando para crear las rutas
const express = require("express");
const router = express.Router();
const generosController = require("../controller/generosLiterarios");


//ruta para listar y verificar si de verdad se introdujeron los generos al principio de la aplicacion 
router.get("/listar", generosController.listar);


//exportando el router para poder usarlo
module.exports = router;