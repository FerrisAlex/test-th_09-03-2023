const db = require('mysql');

const conn = db.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'test_th',
    //socketPath: '/tmp/mysql.sock',
    //port: 3306
});

conn.connect(err => {
    if(err) {
        console.log('Error en la conexion a la base de datos');
    } else {
        console.log('Servidor corriendo en Mysql')
    }
});

module.exports = conn;