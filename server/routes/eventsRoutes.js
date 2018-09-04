import express from 'express';
import bcrypt from 'bcrypt';

import EventsSerializer from '../serializers/events';

const router = express.Router();

module.exports = (dataHelpers) => {
  router.post('/create', async (req, res) => {
    // constructs an object to send to db
    const inputObj = {
      user: req.body.user,
      userId: req.body.userId,
      date: req.body.date,
      title: req.body.title,
      location: req.body.location,
      description: req.body.description,
      going: []
    };

    // grabs userId from successful db insert
    const id = await dataHelpers.insertNewMessage(inputObj);

    const returnObj = inputObj;
    const jsonOutput = EventsSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.post('/going', async (req, res) => {
    // guard statment for existing username

    // constructs an user object to send to db
    const inputObj = {
      user: req.body.username,
      userId: req.body.userId,
      eventId: req.body.eventId
    };

    // grabs userId from successful db insert
    const id = await dataHelpers.insertNewMessageGoing(inputObj);

    const returnObj = inputObj;
    const jsonOutput = EventsSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAllEvents();

    // console.log(result);

    const jsonOutput = EventsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  //   THE ABOVE MUST BE THE LAST ROUTE!!!! ///

  return router;
};
