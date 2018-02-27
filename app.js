import express from 'express';
import logger from 'morgan';
import parser from 'body-parser';

const app = express();

app.use(logger('dev'));

// app.use(parser.json);
app.use(parser.urlencoded({ extended: false }));

app.get('*', (req, res) => res.status(200).send({
    message: 'Welcome to the beginning of nothingness.',
  }));

module.exports = app;
