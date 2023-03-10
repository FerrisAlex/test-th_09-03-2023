const conn = require('../../config/database');

module.exports = (app) => {

    // ----------------------------------- CATEGORIAS --------------------------
    app.get('/getCategorias', (req, res) => {
        let query = 'SELECT id, categoria, descripcion FROM categoria_producto';
        conn.query(query, (error, datos) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al consultar pais'});
            } else {
                res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
            }
            
        });        
    });

    // ----------------------------------- DEPARTAMENTOS --------------------------

    app.get('/getDepartamentos', (req, res) => {
      let query = 'SELECT id, nombre FROM departamento';
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar pais'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });

    // ----------------------------------- MUNICIPIOS --------------------------

    app.get('/getMunicipios', (req, res) => {
      let query = 'SELECT id, depto_id, nombre FROM municipio';
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar pais'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });

    // ----------------------------------- SUCURSALES --------------------------

    app.get('/getSucursales', (req, res) => {
      let query = 'select su.id, su.direccion, su.correo, d.nombre as departamento, m.nombre as municipio, su.telefono from sucursal as su, departamento as d, municipio as m where su.departamento = d.id and su.municipio = m.id;';
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar pais'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });
}