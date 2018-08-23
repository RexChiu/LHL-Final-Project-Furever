import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import path from 'path';
import url from 'url';

import indexController from './routes/index';

require('dotenv').config();

const app = express();
const debug = Debug('server:app');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes

app.use('/', indexController);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.json(err);
});

// Handle uncaughtException
process.on('uncaughtException', (err) => {
  debug('Caught exception: %j', err);
  process.exit(1);
});

export default app;
