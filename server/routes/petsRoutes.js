import express from 'express';

import PetsSerializer from '../serializers/pets';

const router = express.Router();

module.exports = (dataHelpers) => {
  // route to get all of the pets
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    res.json(jsonOutput);
  });

  // routed to AdoptFilter to find pets by filters
  router.put('/filter', async (req, res) => {
    const options = req.body;
    try {
      // filters pets using the options given
      const result = await dataHelpers.filterPets(options);
      // if no results, return empty
      if (result === {}) {
        res.json(result);
      } else {
        const jsonOutput = PetsSerializer.serialize(result);
        res.json(jsonOutput);
      }
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });

  router.get('/:id', async (req, res) => {
    try {
      const result = await dataHelpers.returnNextPets(req.params.id);
      const jsonOutput = PetsSerializer.serialize(result);
      res.json(jsonOutput);
    } catch (err) {
      console.log(err);
      res.json(err);
    }
  });

  return router;
};
