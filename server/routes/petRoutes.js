import express from 'express';
import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/:id/adopt', (req, res) => {
    const result = dataHelpers.adoptPet(req.body.userId, req.body.petId);

    res.json(result);
  });
  return router;
};
