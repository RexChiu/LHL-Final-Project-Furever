// temp data helper functions to return dummy data
import firebaseConverter from './convert-json-to-firebase';
import jsonConverter from './convert-firebase-to-json';

module.exports = function filter(pets, options) {
  const filteredPets = [];

  if (Array.isArray(pets)) {
    const keys = Object.keys(options).splice(1);
    const values = Object.values(options).splice(1);
    // synchronus for loop
    for (let i = 0; i < pets.length; i++) {
      // nested for loop to check all options for every pet
      let matchAll = true;
      for (let j = 0; j < keys.length; j++) {
        // if a key in this pet does not match, do not push into array
        if (pets[i][keys[j]] !== values[j]) {
          matchAll = false;
        }
      }
      if (matchAll) {
        filteredPets.push(pets[i]);
      }
    }
  }

  return Promise.resolve(filteredPets);
};
