// import Debug from 'debug';
import express from 'express';
import logger from 'morgan';
import cors from 'cors';

require('dotenv').config();

// firebase
const firebase = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount)
});

// data helper
const db = firebase.firestore();
const settings = { /* your settings... */ timestampsInSnapshots: true };
db.settings(settings);
const DataHelpers = require('./helpers/data-helpers.js')(db);

// Setup express and environment
const app = express();
// const debug = Debug('server:app');
app.set('env', process.env.APP_ENV || 'development');

// Enable All CORS Requests
app.use(cors());

// HTTP Request logging (disabled in test mode)
if (app.settings.env !== 'test') {
  const loggerType = app.settings.env == 'production' ? 'common' : 'dev';
  app.use(logger(loggerType));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/user', require('./routes/userRoutes.js')(DataHelpers));
app.use('/pets', require('./routes/petsRoutes.js')(DataHelpers));
app.use('/pet', require('./routes/petRoutes.js')(DataHelpers));
app.use('/populate', require('./routes/populateRoutes.js')(DataHelpers));
app.use('/extras', require('./routes/extrasRoutes.js')(DataHelpers));
// JARON ADDED route
app.use('/events', require('./routes/eventsRoutes.js')(DataHelpers));

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// uncomment below for prod, else it removes all error messages

// // error handler
// app.use((err, req, res, next) => {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//   // render the error page
//   res.status(err.status || 500);
//   res.json(err);
// });

// Handle uncaughtException
// process.on('uncaughtException', (err) => {
//   console.log('Caught exception: %j', err);
//   process.exit(1);
// });

export default app;
