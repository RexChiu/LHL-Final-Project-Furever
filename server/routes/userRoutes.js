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
      res.sendStatus(401);
      return;
    }

    // generates a password hash
    const passwordDigest = await bcrypt.hash(req.body.password, SALT_ROUNDS);

    // constructs an user object to send to db
    const inputObj = {
      username: req.body.username,
      passwordDigest,
      lat: req.body.lat,
      lng: req.body.lng,
      adoptedPet: req.body.adoptedPet
    };

    // grabs userId from successful db insert
    const id = await dataHelpers.insertNewUser(inputObj);

    // constructs return obj and serializes it
    const returnObj = {
      id
    };
    const jsonOutput = UserSerializer.serialize(returnObj);
    res.json(jsonOutput);
  });

  router.post('/login', async (req, res) => {
    const inputObj = {
      username: req.body.username,
      password: req.body.password
    };

    // grab user details with login details
    const user = await dataHelpers.getUserDetails(req.body.username);

    // guard statment for no existing user
    if (!user) {
      res.sendStatus(401);
      return;
    }

    // using bcrypt to check password match
    const match = await bcrypt.compare(inputObj.password, user.passwordDigest);

    if (match) {
      const jsonOutput = UserSerializer.serialize(user);
      res.json(jsonOutput);
    } else {
      res.sendStatus(401);
    }
  });

  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAllUsers();

    console.log(result);

    const jsonOutput = UserSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  // JARON EVANS END

  return router;
};
