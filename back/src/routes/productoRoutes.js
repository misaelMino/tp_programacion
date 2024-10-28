const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController'); 

router.get('/all', productoController.getAllProductos);  
router.get('/rubros', productoController.getAllRubros);  
router.get('/rubros/:id', productoController.getAllProductosRubro);  
router.post('/descripcion', productoController.getAllProductosDescripcion);  
//router.get('/get/filters', productoController.getClienteParametrizado);
//getAllProductosDescripcion

module.exports = router;
