import express from 'express';
import bcrypt from 'bcrypt';

import UserSerializer from '../serializers/user';

const router = express.Router();
const SALT_ROUNDS = 10;

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/register', async (req, res) => {
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

  router.post('/login', (req, res) => {
    const inputObj = {
      username: req.body.username,
      password: req.body.password
    };
    res.json(inputObj);
  });

  return router;
};
