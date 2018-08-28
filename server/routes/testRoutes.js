import express from 'express';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

import petfinder from '../api/petfinder';
import sanitizePetfinder from '../helpers/sanitize-petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full',
      count: 500,
      animal: 'dog'
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

  router.get('/populate/dogbreeds', async (req, res) => {
    const options = {
      uri: 'https://www.petfinder.com/dog-breeds'
    };
    const dogBreeds = {};

    rp(options)
      .then((html) => {
        const $ = cheerio.load(html);
        $('#breed_select option').each((i, el) => {
          const name = $(el).text();
          const url = $(el).attr('value');
          dogBreeds[$(el).text()] = {
            name,
            url
          };
        });
        return dataHelpers.saveBreeds(dogBreeds).then(result => result);
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
