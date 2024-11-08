const productoRepository = require('../repositories/productos/productoRepository');

const getAllProductos = async (req, res) => {
    try {
        const productosData = await productoRepository.getAllProductos(); 
        res.json(productosData);  // rta
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' }); //error
    }
};
const getAllProductosRubro = async (req, res) => {
    try {
        const idrubro = req.params.id
        const productosData = await productoRepository.getAllProductosRubro(idrubro); 
        res.json(productosData);  // rta
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener rubro por id' }); //error
    }
};

const getAllProductosDescripcion = async (req, res) => {
    try {
        const data = req.body
        console.log(data);
        const productosData = await productoRepository.getAllProductosDescripcion(data.descripcion); 
        res.json(productosData);  // rta
        
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos por descripcion' }); //error
    }
};


const prueba = async (req, res) => {
    try {
        // Obtén los parámetros de la solicitud
        const { id } = req.params; // Para idrubro (si se usa en la ruta como parámetro)
        const { descripcion } = req.query; // Para descripción (usando query params en GET)

        // Llama a la función parametrizada con los filtros necesarios
        const productosData = await productoRepository.prueba({
            idrubro: id ? parseInt(id) : null, // Convierte idrubro a entero si está presente
            descripcion: descripcion || null // Usa descripción si está presente
        });

        res.json(productosData); // Responde con los datos obtenidos
        console.log(descripcion + " asdasdasdasd");
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener productos' }); // Manejo de errores
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


const getDescripciones = async (req, res) => {
    const data = req.body;
    try {
        const clientesData = await productoRepository.getClienteParametrizado(data.Nombre , data.Apellido, data.NombreBarrio, data.Direccion); 
        console.log(clientesData);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener cliente, parametros erróneos' });
    }
};




module.exports = {
    getAllProductos,
    getDescripciones,
    getAllRubros,
    getAllProductosRubro,
    getAllProductosDescripcion,
    prueba
};

