import express from 'express';
import bcrypt from 'bcrypt';

import UserSerializer from '../serializers/user';

const router = express.Router();
const SALT_ROUNDS = 10;

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/register', async (req, res) => {
    // guard statment for existing username
    const exists = await dataHelpers.getUserDetails(req.body.username);
    if (exists) {
      res.json(null);
      return;
    }

    // generates a password hash
    const passwordDigest = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // constructs an user object to send to db
    const inputObj = {
      username: req.body.username,
      passwordDigest
    };

    // grabs userId from successful db insert
    const userId = await dataHelpers.insertNewUser(inputObj);

    // constructs return obj and serializes it
    const returnObj = {
      userId
    };
    const jsonOutput = UserSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.post('/login', async (req, res) => {
    const user = await dataHelpers.getUserDetails(req.body.username);

    // guard statment for no existing user
    if (!user) {
      res.json(null);
      return;
    }

    // using for loop to grab the key and values of the returned user
    console.log(Object.values(user));

    res.json(user);
  });

  return router;
};
