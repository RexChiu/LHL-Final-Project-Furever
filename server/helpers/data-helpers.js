// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';
import petFilterHelper from './pet-filter-helper';

module.exports = function makeDataHelpers(db) {
  return {
    // returns all pets from the firestore database
    returnAll() {
      const petsRef = db.collection('pets');
      // inits empty array
      const resultArr = [];
      // grabs all the pets under the collection pets
      return petsRef
        .get()
        .then((snapshot) => {
          // loops through snapshot (multiple docs) and pushes into array
          snapshot.forEach(doc => resultArr.push(doc.data()));
          return resultArr;
        })
        .catch(err => err);
    },
    // inserts multiple pets into firestore db
    insertMultiplePets(pets) {
      // creates a batch to insert as a group
      const batch = db.batch();
      const petsRef = db.collection('pets');

      // synchronized for loop to specify the document path and inserting
      for (let i = 0; i < pets.length; i++) {
        // need to toString() the id
        batch.set(petsRef.doc(pets[i].id.toString()), pets[i]);
      }
      // commits the batch and returns
      return batch
        .commit()
        .then(result => result)
        .catch(err => err);
    }
  };
};
