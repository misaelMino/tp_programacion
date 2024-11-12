const productoRepository = require('../repositories/productos/productoRepository');

// const getAllProductos = async (req, res) => {
//     try {
//         const productosData = await productoRepository.getAllProductos(); 
//         res.json(productosData);  // rta
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener productos' }); //error
//     }
// };
// const getAllProductosRubro = async (req, res) => {
//     try {
//         const idrubro = req.params.id
//         const productosData = await productoRepository.getAllProductosRubro(idrubro); 
//         res.json(productosData);  // rta
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener rubro por id' }); //error
//     }
// };

// const getAllProductosDescripcion = async (req, res) => {
//     try {
//         const data = req.body
//         console.log(data);
//         const productosData = await productoRepository.getAllProductosDescripcion(data.descripcion); 
//         res.json(productosData);  // rta
        
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener productos por descripcion' }); //error
//     }
// };
// const getDescripciones = async (req, res) => {
//     const data = req.body;
//     try {
//         const clientesData = await productoRepository.getClienteParametrizado(data.Nombre , data.Apellido, data.NombreBarrio, data.Direccion); 
//         console.log(clientesData);
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener cliente, parametros erróneos' });
//     }
// };

const prueba = async (req, res) => {
    try {

        const idrubro = req.query.idrubro;
        const descripcion = req.query.descripcion;
        
        const productosData = await productoRepository.prueba(idrubro, descripcion);

        res.json(productosData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' }); 
    }
};




const getAllRubros = async (req, res) => {
    try{
        const rubrosData = await productoRepository.getAllRubros(); //rta
        res.json(rubrosData); //rta
    }
    catch (error){
        res.status(500).json({ message: 'Error al obtener rubros'}); //error
    }
}







module.exports = {
    getAllRubros,
    prueba
     //getAllProductos,
    //getDescripciones,
    //getAllProductosRubro,
    //getAllProductosDescripcion,
};

