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
    // function to search if username exists in the database, returns user if exists, null if not
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
            return outputObj;
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // function to search if username exists in the database, returns user if exists, null if not
    getUserDetailsById(userId) {
      // searches in users collection
      const usersRef = db.collection('users').doc(userId);
      return usersRef
        .get()
        .then((result) => {
          if (result.exists) {
            // returns document snapshot, if exists return data
            if (result.exists) {
              return result.data();
            }
            return null;
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // function to see if the petId exists in the database, returns pet if exists, null if not
    getPetDetailsById(petId) {
      // searches in users collection
      const petsRef = db.collection('pets').doc(petId.toString());
      return petsRef
        .get()
        .then((result) => {
          // returns document snapshot, if exists return data
          if (result.exists) {
            return result.data();
          }
          return null;
        })
        .catch((err) => {
          console.log('error');
          return err;
        });
    },
    // moves the pet into user.adopted, and deletes from pets collection
    movePet(user, pet) {
      // grabs the refs of the user and pet
      const usersRef = db
        .collection('users')
        .doc(user.id.toString())
        .collection('adopted')
        .doc(user.id.toString());
      const petsRef = db.collection('pets').doc(pet.id.toString());

      return usersRef
        .set(pet)
        .then(result => result)
        .then(() => petsRef.delete());
    },
    // function to adopt a pet, moves pet from pets collection to a adopted collection in user
    async adoptPet(userId, petId) {
      // specifies the paths
      const usersRef = db
        .collection('users')
        .doc(userId.toString())
        .collection('adopted');
      const petsRef = db.collection('pets').doc(petId.toString());

      // gets the details of the user and pet
      const user = await this.getUserDetailsById(userId);
      const pet = await this.getPetDetailsById(petId);

      if (user && pet) {
        console.log('user and pet exists');
        await this.movePet(user, pet);
        Promise.resolve(true);
      }
      Promise.resolve(false);
    }
  };
};

// // This datahelper will attach the Pet to a userID into the database
// async adoptPet(userID, petID) {
//   const usersRef = ref.child(`users/${userID}/adopted`);
//   const petsRef = ref.child(`pets/${petID}`);

//   console.log('adoptPet', userID, petID);

//   if ((await this.checkPetIDExists(petID)) && (await this.checkUserIDExists(userID))) {
//     console.log('After PetID and UserID exists');
//     this.moveFbRecord(petsRef, usersRef);
//     return true;
//   }
//   return false;
// },
