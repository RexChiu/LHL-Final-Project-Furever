import express from 'express';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

import petfinder from '../api/petfinder';

import sanitizePetfinder from '../helpers/sanitize-petfinder';

import VetsSerializer from '../serializers/vets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/findpet/:id', async (req, res) => {
    const result = await dataHelpers.getPetDetails(req.params.id);
    res.json(result);
  });

  return router;
};
