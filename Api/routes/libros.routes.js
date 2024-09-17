//importando para crear las rutas
const express = require("express");
const router = express.Router();
const librosController = require("../controller/libros")

//ruta de prueba
router.get("/ruta-de-prueba",librosController.test);

//rutas utiles
router.post("/crear", librosController.crear);
router.get("/listar", librosController.listar);
router.get("/libros/:id", librosController.detalle);
router.delete("/libros/:id", librosController.borrar);
router.put("/libros/:id", librosController.actualizar);

//exportando el router para poder usarlo
module.exports = router;