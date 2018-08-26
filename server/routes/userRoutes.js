import express from 'express';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/register', (req, res) => {
    const inputObj = {
      username: req.body.username,
      password: req.body.password
    };
    res.json(inputObj);
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
