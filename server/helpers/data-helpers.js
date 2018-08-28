// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';
import petFilterHelper from './pet-filter-helper';

module.exports = function makeDataHelpers(db) {
  return {
    insertMultiplePets(pets) {
      const batch = db.batch();

      for (let i = 0; i < pets.length; i++) {
        batch.set(db.collection('pets').doc(pets[i].id.toString()), pets[i]);
      }
      return batch
        .commit()
        .then(result => result)
        .catch(err => err);
    }
  };
};
