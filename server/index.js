const app = require('./config/server');
const port = app.get('puerto');

require('./app/paths/requests')(app);

app.listen(port, () => console.log( `Servidor escuchando en el puerto ${port}`));