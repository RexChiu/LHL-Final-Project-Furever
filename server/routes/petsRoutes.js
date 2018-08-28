import express from 'express';

import PetsSerializer from '../serializers/pets';
import petfinder from '../api/petfinder';
import sanitizePetfinder from '../helpers/sanitize-petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  router.get('/petfind', async (req, res) => {
    const result = await dataHelpers.checkPetIDExists(37527717);

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.post('/:id/adopt', (req, res) => {
    const templateVar = {
      userId: req.body.userId,
      petId: req.body.petID
    };

    const result = dataHelpers.adoptPet(req.body.userId, req.body.petId);

    res.json(result);
  });

  // router.get('/adopt', async (req, res) => {
  //   const result = await dataHelpers.adoptPet('-LKrevl5Yz2jAqcNaD9b', 20217221);

  //   // comment this out for serialized data
  //   res.json(result);

  //   // uncomment this for serialized data
  //   // const jsonOutput = PetsSerializer.serialize(result);
  //   // res.json(jsonOutput);
  // });

  router.get('/useridfind', async (req, res) => {
    const result = await dataHelpers.checkUserIDExists('-LKx26xM_YDH0WQde2Ia');

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full',
      count: 100
    };
    try {
      const result = await petfinder('pet.find', options);
      const sanitized = await sanitizePetfinder(result);
      const output = await dataHelpers.insertMultiplePets(sanitized);
      res.json(output);
    } catch (e) {
      console.log('Error', e);
      res.json(e);
    }
  });

  return router;
};
