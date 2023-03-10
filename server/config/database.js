const db = require('mysql');

const conn = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_th',
});

conn.connect(err => {
    if(err) {
        console.log('Error en la conexion a la base de datos');
    } else {
        console.log('Servidor corriendo en Mysql')
    }
});


module.exports = conn;