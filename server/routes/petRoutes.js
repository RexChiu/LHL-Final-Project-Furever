import express from 'express';
import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/:id/adopt', (req, res) => {
    const id = req.params.id;

    res.json(req.body);
  });

  return router;
};
