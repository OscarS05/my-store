const express = require('express');
const cors = require('cors');
const routerApi = require('./routes');

const { checkApiKey } = require('./middlewares/auth.handler');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const whitelist = ['http://localhost:5500'];
const options = {
  origin: (origin, callback) => {
    if(whitelist.includes(origin) || !origin){
      callback(null, true);
    } else {
      callback(new Error("No permitido"));
    }
  }
}
app.use(cors(options));

require('./utils/auth');

app.get('/api', (req, res) => {
  res.send('Hola, mi server en experss');
});

app.get('/api/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () =>{
  // console.log('Mi port' + port);
});
