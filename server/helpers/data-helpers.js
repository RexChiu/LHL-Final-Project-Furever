// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';
import petFilterHelper from './pet-filter-helper';

module.exports = function makeDataHelpers(db) {
  return {
    returnAll() {
      const petsRef = db.collection('pets');
      const resultArr = [];
      return petsRef
        .get()
        .then((snapshot) => {
          // synchronized for loop
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    insertMultiplePets(pets) {
      const batch = db.batch();
      const petsRef = db.collection('pets');

      for (let i = 0; i < pets.length; i++) {
        batch.set(petsRef.doc(pets[i].id.toString()), pets[i]);
      }
      return batch
        .commit()
        .then(result => result)
        .catch(err => err);
    }
  };
};
