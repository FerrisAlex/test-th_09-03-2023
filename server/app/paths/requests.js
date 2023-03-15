const conn = require('../../config/database');

module.exports = (app) => {

    // ----------------------------------- CATEGORIAS --------------------------
    app.get('/getCategorias', (req, res) => {
        let query = 'SELECT id, nombre FROM categoria';
        conn.query(query, (error, datos) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al consultar'});
            } else {
                res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
            }
            
        });        
    });

    app.get('/getCategoria', (req, res) => {
        let query = 'SELECT cp.id, cp.categoria as categoria_id, cp.descripcion, c.nombre as categoria FROM categoria_producto as cp, categoria as c WHERE cp.categoria=c.id';
        conn.query(query, (error, datos) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al consultar'});
            } else {
                res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
            }
            
        });        
    });

    app.post('/addCategoria', (req, res) => {
        let query = `INSERT INTO categoria_producto (categoria, descripcion) VALUES (${req.body.categoria}, '${req.body.descripcion}')`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al insertar'});
            } else {
                res.json({status: 1, mensaje: 'Inserción de dato satisfactorio'});
            }
        }); 
    });

    app.put('/updateCategoria', (req, res) => {
        let query = `UPDATE categoria_producto SET categoria=${req.body.categoria}, descripcion='${req.body.descripcion}' WHERE id='${req.body.idCategoria}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al editar dato'});
            } else {
                res.json({status: 1, mensaje: 'Edicion de dato satisfactorio'});
            }
        }); 
    });

    app.delete('/deleteCategoria', (req, res) => {
        let query = `DELETE FROM categoria_producto WHERE id='${req.body.idCategoria}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al eliminar datos'});
            } else {
                res.json({status: 1, mensaje: 'Eliminacion de dato satisfactorio'});
            }
        }); 
    });

    // ----------------------------------- DEPARTAMENTOS --------------------------

    app.get('/getDepartamentos', (req, res) => {
      let query = 'SELECT id, nombre FROM departamento';
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });

    // ----------------------------------- MUNICIPIOS --------------------------

    app.get('/getMunicipios', (req, res) => {
        let { id } = req.query;
      let query = `SELECT id, depto_id, nombre FROM municipio ${id? 'WHERE depto_id=' + id : ''} `;
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });

    // ----------------------------------- SUCURSALES --------------------------

    app.get('/getSucursales', (req, res) => {
      let query = 'select su.id, su.direccion, su.correo, su.departamento as departamento_id, su.municipio as municipio_id, d.nombre as departamento, m.nombre as municipio, su.telefono from sucursal as su, departamento as d, municipio as m where su.departamento = d.id and su.municipio = m.id;';
      conn.query(query, (error, datos) => {
          if(error) {
              res.json({status: 0, error: error, mensaje: 'Error al consultar'});
          } else {
              res.json({status: 1, mensaje: 'Consulta realizada satisfactoriamente', data: datos});
          }
          
      });        
    });
        
    app.post('/addSucursal', (req, res) => {
        let query = `INSERT INTO sucursal (direccion, correo, departamento, municipio, telefono) VALUES ('${req.body.direccion}', '${req.body.correo}', ${req.body.departamento}, ${req.body.municipio}, '${req.body.telefono}')`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al insertar'});
            } else {
                res.json({status: 1, mensaje: 'Inserción de dato satisfactorio'});
            }
        }); 
    });

    app.put('/updateSucursal', (req, res) => {
        let query = `UPDATE sucursal SET direccion='${req.body.direccion}', correo='${req.body.correo}', departamento=${req.body.departamento}, municipio=${req.body.municipio}, telefono='${req.body.telefono}' WHERE id='${req.body.idSucursal}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al editar dato'});
            } else {
                res.json({status: 1, mensaje: 'Edicion de dato satisfactorio'});
            }
        }); 
    });

    app.delete('/deleteSucursal', (req, res) => {
        let query = `DELETE FROM sucursal WHERE id='${req.body.idSucursal}'`;
        conn.query(query, (error, filas) => {
            if(error) {
                res.json({status: 0, error: error, mensaje: 'Error al eliminar datos'});
            } else {
                res.json({status: 1, mensaje: 'Eliminacion de dato satisfactorio'});
            }
        }); 
    });
}