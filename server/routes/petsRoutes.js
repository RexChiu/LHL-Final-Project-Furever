import express from 'express';

import PetsSerializer from '../serializers/pets';
import petfinder from '../api/petfinder';
import sanitizePetfinder from '../helpers/sanitize-petfinder';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

  return router;
};
