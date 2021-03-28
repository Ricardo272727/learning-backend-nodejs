const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./rutas');
const { ajvMiddleware } = require('./ajv');

app.use(bodyParser.json());
app.use('/', routes);
app.use(ajvMiddleware);
app.listen(4000, () => {
  console.log('Server ready!');
})





