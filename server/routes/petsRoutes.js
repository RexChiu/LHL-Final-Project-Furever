import express from 'express';
import parser from 'fast-xml-parser';

import PetsSerializer from '../serializers/pets';
import sanitizePetfinder from '../helpers/sanitize-petfinder';
import firebaseConverter from '../helpers/convert-json-to-firebase';
import petfinder from '../api/petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', (req, res) => {
    const result = dataHelpers.findAll();

    const jsonOutput = PetsSerializer.serialize(result);
    res.json(jsonOutput);
  });

  router.get('/test', async (req, res) => {
    const result = await dataHelpers.returnAll();

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full'
    };
    try {
      const result = await petfinder('pet.find', options);

      const output = await dataHelpers.insertMultiplePets(result);
      res.json(output);
    } catch (e) {
      console.log('Error', e);
    }
  });

  return router;
};
