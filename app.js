import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';


const app = express();
const swaggerDocument = YAML.load('./swagger.yaml');

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const Route = require('./server/routes/routes');

app.use('/', Route);
app.use('/api-weconnect-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('*', (req, res) => res.status(400).send({
  message: 'Welcome to the beginning of nothingness.',
}));


module.exports = app;
