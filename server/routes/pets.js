import express from 'express';

const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  const PetsSerializer = new JSONAPISerializer('pets', {
    attributes: ['name', 'type']
  });
  const PetSerializer = new JSONAPISerializer('pet', {
    attributes: ['name', 'type']
  });

  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();
    const pets = PetsSerializer.serialize(result);

    res.json(pets);
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = dataHelpers.find(id);
    const pet = PetSerializer.serialize(result);

    res.json(pet);
  });

  return router;
};
