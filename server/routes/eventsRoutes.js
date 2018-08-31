import express from 'express';
import bcrypt from 'bcrypt';

import EventsSerializer from '../serializers/events';

const router = express.Router();
// const SALT_ROUNDS = 10;

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAllEvents();

    console.log(result);

    const jsonOutput = EventsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  //   THE ABOVE MUST BE THE LAST ROUTE!!!! ///

  return router;
};
