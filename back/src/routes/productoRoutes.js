const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController'); 

//router.get('/all', productoController.getAllProductos);  
//router.get('/rubros/:id', productoController.getAllProductosRubro);  
//router.post('/descripcion', productoController.getAllProductosDescripcion); //hacer uno solo parametrizado
router.get('/rubros', productoController.getAllRubros);  
router.get('/', productoController.prueba);
router.get('/:id', productoController.prueba);



 
//router.get('/get/filters', productoController.getClienteParametrizado);
//getAllProductosDescripcion

module.exports = router;
