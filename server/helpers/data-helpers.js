// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';
import petFilterHelper from './pet-filter-helper';
import uuidv4 from 'uuid/v4';

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
    },
    // inserts a new user into the firestore db
    insertNewUser(newUser) {
      // creates a new unique id for a user and adds into user
      const usersRef = db.collection('users').doc();
      newUser.id = usersRef.id;
      // inserts user into the database
      usersRef
        .set(newUser)
        .then(result => usersRef.id)
        .then(err => err);
    },
    // searches the db for a username
    getUserDetails(username) {
      // searches in users collection
      const usersRef = db.collection('users');
      return usersRef
        .where('username', '==', username)
        .get()
        .then((result) => {
          // query returns a querySnapshot, which has an array (.docs) of documentSnapshot
          if (!result.empty) {
            // grabs the first instance of the query
            const outputObj = result.docs[0].data();
            // grabs the id of the document in a weird way and append to output
            outputObj.id = result.docs[0].ref.id;
            return outputObj;
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    }
  };
};
