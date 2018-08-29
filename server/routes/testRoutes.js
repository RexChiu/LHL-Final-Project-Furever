import express from 'express';

import rp from 'request-promise-native';
import cheerio from 'cheerio';

import petfinder from '../api/petfinder';
import vetfinder from '../api/vetfinder';

import sanitizePetfinder from '../helpers/sanitize-petfinder';

<<<<<<< HEAD
/* shop API */
import shop from '../api/shopfinder';
=======
import VetsSerializer from '../serializers/vets';
>>>>>>> 1c38ab09b17ca4395179d9100a637df5eebe22a6

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
      count: 500,
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
  // added in for shop data -JARON EVANS
  router.get('/petfood', async (req, res) => {
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
  // added in above for shop data -JARON EVANS

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

  router.get('/populate/dogbreeds', async (req, res) => {
    // constructs options to do a cheerio web scrape
    const options = {
      uri: 'https://www.petfinder.com/dog-breeds',
      transform(body) {
        return cheerio.load(body);
      }
    };
    const dogBreeds = [];

    // sends request, grab all the HTML and load into $ (cheerio)
    rp(options)
      .then(($) => {
        // selects the breeds list, and iterates through each one
        $('#breed_select option').each((i, el) => {
          const name = $(el).text();
          // .trim();
          const url = $(el).attr('value');
          // pushes extracted dog breed into array
          dogBreeds.push({
            name,
            url
          });
        });
        return dataHelpers.saveBreeds('dog', dogBreeds).then(result => result);
        // return dogBreeds;
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  router.get('/populate/catbreeds', async (req, res) => {
    // constructs options to do a cheerio web scrape
    const options = {
      uri: 'https://www.petfinder.com/cat-breeds',
      transform(body) {
        return cheerio.load(body);
      }
    };
    const catBreeds = [];

    // sends request, grab all the HTML and load into $ (cheerio)
    rp(options)
      .then(($) => {
        // selects the breeds list, and iterates through each one
        $('#breed_select option').each((i, el) => {
          const name = $(el).text();
          // .trim();
          const url = $(el).attr('value');
          // pushes extracted cat breed into array
          catBreeds.push({
            name,
            url
          });
        });
        return dataHelpers.saveBreeds('cat', catBreeds).then(result => result);
        // return catBreeds;
      })
      .then(result => res.json(result))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  });

  router.get('/populate/catcare', async (req, res) => {
    try {
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

        const catInfo = {};

        // makes API call to grab the personality and traits
        rp(options)
          .then(($) => {
            const personality = $('h2')
              .filter((i, el) => $(el).text() === personalityTag)
              .parent()
              .html()
              .trim();

            catInfo.personality = personality;
            return $;
          })
          .then(($) => {
            const traits = $('h2')
              .filter((i, el) => $(el).text() === traitsTag)
              .parent()
              .html()
              .trim();

            catInfo.traits = traits;
          })
          .then(() => dataHelpers.saveInfo('cat', cat.name, catInfo).then(() => 'Ok'));
      });

      res.json('ok');
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });

  router.get('/populate/dogcare', async (req, res) => {
    try {
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

        const dogInfo = {};

        // makes API call to grab the temperment, care, and health
        rp(options)
          .then(($) => {
            const temperment = $('h2')
              .filter((i, el) => $(el).text() === tempermentTag)
              .parent()
              .html()
              .trim();

            dogInfo.temperment = temperment;
            return $;
          })
          .then(($) => {
            const care = $('h2')
              .filter((i, el) => $(el).text() === careTag)
              .parent()
              .html()
              .trim();

            dogInfo.care = care;
            return $;
          })
          .then(($) => {
            const health = $('h2')
              .filter((i, el) => $(el).text() === healthTag)
              .parent()
              .html()
              .trim();

            dogInfo.health = health;
          })
          .then(() => dataHelpers.saveInfo('dog', dog.name, dogInfo).then(() => 'Ok'));
      });

      res.json('ok');
    } catch (e) {
      console.log(e);
      res.json(e);
    }
  });

  return router;
};
