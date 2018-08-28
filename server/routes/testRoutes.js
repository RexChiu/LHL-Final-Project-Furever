import express from 'express';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

import petfinder from '../api/petfinder';
import sanitizePetfinder from '../helpers/sanitize-petfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/findpet/:id', async (req, res) => {
    const result = await dataHelpers.getPetDetails(req.params.id);
    res.json(result);
  });

  router.get('/populate', async (req, res) => {
    const options = {
      location: 'toronto,ontario',
      output: 'full',
      count: 200,
      animal: 'cat'
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
      uri: 'https://www.petfinder.com/dog-breeds',
      transform(body) {
        return cheerio.load(body);
      }
    };
    const dogBreeds = {};

    rp(options)
      .then(($) => {
        $('#breed_select option').each((i, el) => {
          const name = $(el).text();
          const url = $(el).attr('value');
          dogBreeds[$(el).text()] = {
            name,
            url
          };
        });
        return dataHelpers.saveBreeds('dog', dogBreeds).then(result => result);
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log(err);
      });
  });

  router.get('/populate/catbreeds', async (req, res) => {
    const options = {
      uri: 'https://www.petfinder.com/cat-breeds',
      transform(body) {
        return cheerio.load(body);
      }
    };
    const catBreeds = {};

    rp(options)
      .then(($) => {
        $('#breed_select option').each((i, el) => {
          const name = $(el).text();
          const url = $(el).attr('value');
          catBreeds[$(el).text()] = {
            name,
            url
          };
        });
        return dataHelpers.saveBreeds('cat', catBreeds).then(result => result);
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log(err);
      });
  });

  router.get('/populate/catcare', async (req, res) => {
    // grabs the entire list of breeds from db
    const breeds = await dataHelpers.getBreeds('cat');

    breeds.forEach((cat) => {
      const personalityTag = `${cat.name} Cat Personality`;
      const traitsTag = `${cat.name} Cat Breed Traits`;
      const options = {
        uri: cat.url,
        transform(body) {
          return cheerio.load(body);
        }
      };

      // makes API call to grab the personality and traits
      rp(options)
        .then(($) => {
          const personality = $('h2')
            .filter((i, el) => $(el).text() === personalityTag)
            .parent()
            .html()
            .trim();

          return dataHelpers.saveInfo('cat', 'personality', cat.name, personality).then(() => $);
        })
        .then(($) => {
          const traits = $('h2')
            .filter((i, el) => $(el).text() === traitsTag)
            .parent()
            .html()
            .trim();

          return dataHelpers.saveInfo('cat', 'traits', cat.name, traits).then(() => 'Ok');
        });
    });

    res.json('ok');
  });

  router.get('/populate/dogcare', async (req, res) => {
    // grabs the entire list of breeds from db
    const breeds = await dataHelpers.getBreeds('dog');

    breeds.forEach((dog) => {
      const tempermentTag = `${dog.name} Dog Temperament`;
      const careTag = `${dog.name} Dog Care`;
      const healthTag = `${dog.name} Dog Health`;
      const options = {
        uri: dog.url,
        transform(body) {
          return cheerio.load(body);
        }
      };

      // makes API call to grab the temperment, care, and health
      rp(options)
        .then(($) => {
          const temperment = $('h2')
            .filter((i, el) => $(el).text() === tempermentTag)
            .parent()
            .html()
            .trim();

          return dataHelpers.saveInfo('dog', 'temperment', dog.name, temperment).then(() => $);
        })
        .then(($) => {
          const care = $('h2')
            .filter((i, el) => $(el).text() === careTag)
            .parent()
            .html()
            .trim();

          return dataHelpers.saveInfo('dog', 'care', dog.name, care).then(() => $);
        })
        .then(($) => {
          const health = $('h2')
            .filter((i, el) => $(el).text() === healthTag)
            .parent()
            .html()
            .trim();

          return dataHelpers.saveInfo('dog', 'health', dog.name, health).then(() => 'Ok');
        });
    });

    res.json('ok');
  });

  return router;
};
