import express from 'express';

const JSONAPISerializer = require('jsonapi-serializer').Serializer;

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  const PetsSerializer = new JSONAPISerializer('pets', {
    attributes: ['name', 'animal']
  });

  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();
    const jsonOutput = PetsSerializer.serialize(result);

    res.json(jsonOutput);
  });

  router.get('/:id', (req, res) => {
    const id = req.params.id;
    const result = dataHelpers.find(id);
    const jsonOutput = PetsSerializer.serialize(result);

    res.json(jsonOutput);
  });

  return router;
};
