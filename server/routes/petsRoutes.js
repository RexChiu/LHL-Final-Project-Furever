import express from 'express';

import PetsSerializer from '../serializers/pets';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  router.get('/', async (req, res) => {
    const result = await dataHelpers.returnAll();

    const jsonOutput = PetsSerializer.serialize(result);
    // const jsonOutput = result;
    res.json(jsonOutput);
  });

<<<<<<< HEAD
=======
  router.get('/petfind', async (req, res) => {
    const result = await dataHelpers.checkPetIDExists(37527717);

    // comment this out for serialized data
    res.json(result);

    // uncomment this for serialized data
    // const jsonOutput = PetsSerializer.serialize(result);
    // res.json(jsonOutput);
  });

  router.post('/:id/adopt', (req, res) => {
    const templateVar = {
      userId: req.body.userId,
      petId: req.body.petID
    };

    const result = dataHelpers.adoptPet(req.body.userId, req.body.petId);

    res.json(result);
  });

  // router.get('/adopt', async (req, res) => {
  //   const result = await dataHelpers.adoptPet('-LKrevl5Yz2jAqcNaD9b', 20217221);

  //   // comment this out for serialized data
  //   res.json(result);

  //   // uncomment this for serialized data
  //   // const jsonOutput = PetsSerializer.serialize(result);
  //   // res.json(jsonOutput);
  // });

  router.get('/useridfind', async (req, res) => {
    const result = await dataHelpers.checkUserIDExists('-LKx26xM_YDH0WQde2Ia');

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

  // routed to AdoptFilter.jsx to find pets by filters
  router.put('/filter', async (req, res) => {
    console.log(`Req Body ${JSON.stringify(req.body)}`);
    const breedOut = req.body.breed;
    const ageOut = req.body.age;
    const options = {
      breed: req.body.breed,
      age: req.body.age
    };
    console.log('//----OPTIONS----//', options);

    const result = await dataHelpers.filterPets(options);
    if (result === {}) {
      const data = {};
      res.json(data);
    } else {
      const jsonOutput = PetsSerializer.serialize(result);
      res.json(jsonOutput);
      console.log(jsonOutput);
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

>>>>>>> b618669fff3d4744d160cac429f46af22d8b0c3a
  return router;
};
