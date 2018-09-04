import express from 'express';
import VetsSerializer from '../serializers/vets';
import BreedsSerializer from '../serializers/breeds';
import BreedMapper from '../helpers/breed-mapper';
import vetfinder from '../api/vetfinder';

const router = express.Router();

// helper function to get the breeds of the user's pets
function getBreeds(pets) {
  const petBreeds = {
    Cat: [],
    Dog: []
  };

  // loops through each pet to get their breed
  for (const pet of pets) {
    // splits up any mixed breeds into arrays
    const breedsArr = pet.breed.split(' and ');
    // loops through breeds array (of a single pet) and appends onto petBreeds obj
    for (const breed of breedsArr) {
      // if the breed does not exist in the
      if (!petBreeds[pet.animal].includes(breed)) {
        petBreeds[pet.animal].push(breed);
      }
    }
  }
  return Promise.resolve(petBreeds);
}

module.exports = (dataHelpers) => {
  router.get('/places', async (req, res) => {
    const options = {
      location: req.query.location,
      type: req.query.type,
      radius: req.query.radius,
      keyword: req.query.keyword
    };
    try {
      const result = await vetfinder('nearbysearch', options);
      const jsonOutput = VetsSerializer.serialize(result);
      res.json(jsonOutput);
    } catch (e) {
      console.log('Error', e);
      res.json(e);
    }
  });

  // gets pet care info for the user
  router.get('/care/:id', async (req, res) => {
    // grabs the adopted pets array of the user, empty obj if none exists
    const pets = await dataHelpers.getUserPetsByUserId(req.params.id);
    if (pets === []) {
      res.json({ cat: [], dog: [] });
      return;
    }
    // get the unique breeds out for cats and dogs
    const petBreeds = await getBreeds(pets);
    const mappedBreeds = BreedMapper(petBreeds);
    const result = await dataHelpers.getAllBreedInfo(mappedBreeds);
    const jsonOutput = BreedsSerializer.serialize(result);
    res.json(jsonOutput);
  });

  return router;
};
