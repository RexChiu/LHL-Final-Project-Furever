import express from 'express';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

import petfinder from '../api/petfinder';
import vetfinder from '../api/vetfinder';

import sanitizePetfinder from '../helpers/sanitize-petfinder';

/* shop API */
import shop from '../api/shopfinder';
import VetsSerializer from '../serializers/vets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/findpet/:id', async (req, res) => {
    const result = await dataHelpers.getPetDetails(req.params.id);
    res.json(result);
  });

  /* GET places page. */
  router.get('/places', async (req, res) => {
    const options = {
      location: '43.6446,-79.3950',
      type: 'veterinary_care',
      radius: 1500,
      keyword: 'pets'
    };
    try {
      const result = await vetfinder('nearbysearch', options);
      const jsonOutput = VetsSerializer.serialize(result);
      res.json(jsonOutput);
      // res.json(result);
    } catch (e) {
      console.log('Error', e);
      res.json(e);
    }
  });

  return router;
};
