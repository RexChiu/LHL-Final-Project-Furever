import express from 'express';
import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.post('/:id/adopt', async (req, res) => {
    const result = await dataHelpers.adoptPet(req.body.userId, req.params.id);

    res.json(result);
  });

  // function to get the pet care info of the specified breed
  router.get('/:breed/care', async (req, res) => {});
  return router;
};
