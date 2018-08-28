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

  router.get('/petfind', async (req, res) => {
    const result = await dataHelpers.checkPetExists(20217192);

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/adopt', async (req, res) => {
    const result = await dataHelpers.adoptPet('-LKrevl5Yz2jAqcNaD9b', 20217221);

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.get('/useridfind', async (req, res) => {
    const result = await dataHelpers.checkUserIDExists('-LKrbAGsDo6KsWQ-7reg');

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
          dogBreeds[$(el).text()] = $(el).attr('value');
        });
        res.json(dogBreeds);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return router;
};
