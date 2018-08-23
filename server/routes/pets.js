import express from 'express';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();

    res.json({
      title: result
    });
  });

  return router;
};
