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
//unir consultas, parametrizar 

const prueba = async ({ idrubro = null, descripcion = null } = {}) => {
  const connection = await database.getConnection();
  let query = `
    select p.codigo, p.descripcion, p.precio, p.urlimagen, r.descripcion as descripcionrubro
    from productos as p 
    left join rubros as r on p.idrubro=r.idrubro
    where 1=1
    `;
  const params = [];

  if (idrubro !== null) {
      query += ` and p.idrubro = ?`;
      params.push(idrubro);
  } else if (descripcion !== null) {
      query += ` and p.descripcion like ?`;
      params.push(`%${descripcion}%`);
  }

  const [result] = await connection.query(query, params);
  console.log(descripcion) + " esto es repo";
  console.log("query: " + query);
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
    getAllProductosDescripcion,
    prueba

};

