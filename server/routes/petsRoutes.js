import express from 'express';

import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  // routed to AdoptFilter.jsx to find pets by filters
  router.put('/filter', async (req, res) => {
    console.log(`Req Body ${JSON.stringify(req.body)}`);
    const breedOut = req.body.breed;
    const ageOut = req.body.age;
    const options = req.body;

    const result = await dataHelpers.filterPets(options);
    if (result === {}) {
      res.json(result);
    } else {
      const jsonOutput = PetsSerializer.serialize(result);
      res.json(jsonOutput);
    }
  });

  return router;
};
