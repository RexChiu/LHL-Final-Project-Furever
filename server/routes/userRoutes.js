import express from 'express';
import bcrypt from 'bcrypt';

import UserSerializer from '../serializers/user';
import PetsSerializer from '../serializers/pets';

const router = express.Router();
const SALT_ROUNDS = 10;

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
      email: req.body.email,
      passwordDigest,
      lat: req.body.lat,
      lng: req.body.lng,
      adopted: req.body.adopted
    };

    // grabs userId from successful db insert
    const id = await dataHelpers.insertNewUser(inputObj);

    // constructs return obj and serializes it
    delete inputObj.passwordDigest;
    const returnObj = inputObj;
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
      delete user.passwordDigest;
      const jsonOutput = UserSerializer.serialize(user);
      res.json(jsonOutput);
    } else {
      res.sendStatus(401);
    }
  });

  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAllUsers();

    const jsonOutput = UserSerializer.serialize(result);
    res.json(jsonOutput);
  });

  router.get('/withpets', async (req, res) => {
    const result = await dataHelpers.getUsersWithPets();

    const jsonOutput = UserSerializer.serialize(result);
    res.json(jsonOutput);
  });

  router.get('/:id/withpets', async (req, res) => {
    const result = await dataHelpers.getUserWithPets(req.params.id);

    const jsonOutput = UserSerializer.serialize(result);
    res.json(jsonOutput);
  });

  // gets the pets of the user
  router.get('/:id/pets', async (req, res) => {
    try {
      const pets = await dataHelpers.getUserPetsByUserId(req.params.id);
      const jsonOutput = PetsSerializer.serialize(pets);
      res.json(jsonOutput);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });

  //   THIS MUST BE THE LAST ROUTE!!!!!!!!  ///
  // get details of the user
  router.get('/:id', async (req, res) => {
    try {
      const user = await dataHelpers.getUserDetailsById(req.params.id);
      const jsonOutput = UserSerializer.serialize(user);
      res.json(jsonOutput);
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });
  //   THE ABOVE MUST BE THE LAST ROUTE!!!! ///

  return router;
};
