const database = require("../../config/database");

const getAllProductos = async () => {
    const connection = await database.getConnection();
    const [result] = await connection.query(`
      select p.codigo, p.descripcion, p.precio, p.urlimagen, r.descripcion as descripcionrubro
      from productos as p 
      left join rubros as r on p.idrubro=r.idrubro;`);
    return result;
}

const getAllProductosRubro = async (idrubro) => {
  const connection = await database.getConnection();
  const [result] = await connection.query(`
    select p.codigo, p.descripcion, p.precio, p.urlimagen, r.descripcion as descripcionrubro
    from productos as p 
    left join rubros as r on p.idrubro=r.idrubro
    where p.idrubro = ?;`, [idrubro]);
  return result;
}

const getAllProductosDescripcion = async (descripcion) => {
  const connection = await database.getConnection();
  const [result] = await connection.query(`
    select p.codigo, p.descripcion, p.precio, p.urlimagen, r.descripcion as descripcionrubro
    from productos as p 
    left join rubros as r on p.idrubro=r.idrubro
    where p.descripcion like ?;`, [`%${descripcion}%`]);
  return result;
}



const getAllRubros = async () => {
  const connection = await database.getConnection();
  const [result] = await connection.query(`
      select * from rubros;
    `);
  return result;
};




module.exports = {
    getAllProductos,
    getAllRubros,
    getAllProductosRubro,
    getAllProductosDescripcion

};

