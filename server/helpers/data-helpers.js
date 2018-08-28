// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';

module.exports = function makeDataHelpers(db) {
  const ref = db.ref('restricted_access/secret_document');

  return {
    returnAll() {
      return ref.once('value').then(snap => jsonConverter(snap.val()));
    },
    // Insert Pet records from the sanitized API to the database.
    insertMultiplePets(jsonInput) {
      const petsRef = ref.child('pets');

      const jsonInputCleaned = firebaseConverter(jsonInput);

      return petsRef
        .set(jsonInputCleaned)
        .then(() => {
          console.log('Synchronization succeeded');
          return jsonInputCleaned;
        })
        .catch((error) => {
          console.log('Synchronization failed');
          return error;
        });
    },
    // This datahelper will insert/register a new user into the database
    insertNewUser(newUser) {
      const usersRef = ref.child('users');
      const newUserRef = usersRef.push();
      console.log(newUserRef.key);
      return newUserRef.set(newUser).then(() => newUserRef.key);
    },
    moveFbRecord(oldRef, newRef) {
      oldRef.once('value', (snap) => {
        const newAdoptRef = newRef.push();
        newAdoptRef.set(snap.val(), (error) => {
          if (!error) {
            oldRef.remove();
          } else if (typeof console !== 'undefined' && console.error) {
            console.error(error);
          }
        });
      });
    },
    // This datahelper will check if the provided petID exists(returns boolean) in the database
    checkPetIDExists(petID) {
      const usersRef = ref.child('pets');
      console.log('Within checkPetExists', petID);
      return new Promise((resolve, reject) => {
        usersRef.child(petID).once('value', (snapshot) => {
          const exists = snapshot.val() !== null;
          console.log('Value of checkPetIDExists exists ', exists);
          resolve(exists);
        });
      });
    },
    // This datahelper will check if the provided username exists(returns boolean) in the database
    checkUserExists(userName) {
      const usersRef = ref.child('users');
      console.log('Within checkUserExists');
      return new Promise((resolve, reject) => {
        usersRef
          .orderByChild('username')
          .equalTo(userName)
          .once('value', (snapshot) => {
            const exists = snapshot.val() !== null;
            console.log('Value of checkUserExists exists ', exists);
            resolve(exists);
          });
      });
    },
    // This datahelper will check if the provided userID exists(returns boolean) in the database
    checkUserIDExists(userID) {
      const usersRef = ref.child('users');
      console.log('Within checkUserIDExists');
      return new Promise((resolve, reject) => {
        usersRef.child(userID).once('value', (snapshot) => {
          const exists = snapshot.val() !== null;
          console.log('Value of checkUserIDExists exists ', exists);
          resolve(exists);
        });
      });
    },
    // This datahelper will attach the Pet to a userID into the database
    async adoptPet(userID, petID) {
      const usersRef = ref.child(`users/${userID}/adopted`);
      const petsRef = ref.child(`pets/${petID}`);

      console.log('adoptPet', userID, petID);

      if ((await this.checkPetIDExists(petID)) && (await this.checkUserIDExists(userID))) {
        console.log('After PetID and UserID exists');
        this.moveFbRecord(petsRef, usersRef);
        return true;
      }
      return false;
    },
    // This datahelper will return all details for an existing username from the database
    async getUserDetails(userName) {
      const usersRef = ref.child('users');
      const exists = await this.checkUserExists(userName);
      console.log('Before true-> exists', exists);
      if (exists === true) {
        console.log('---->Within true', userName);
        return usersRef
          .orderByChild('username')
          .equalTo(userName)
          .once('value', snap => snap.val());
      }
      return null;
    },
    // This datahelper will insert/register a demo record into the database
    insertNewUser(newUser) {
      const usersRef = ref.child('users');
      const newUserRef = usersRef.push();
      console.log();
      newUser.id = newUserRef.key;
      return newUserRef.set(newUser).then(() => newUserRef.key);
    },
    // Test Function
    returnPetDescription() {
      return ref.once('value').then(snap => snap.val());
    },
    // Test function
    findAll() {
      return [
        { id: 1, name: 'Cats', animal: 'Cats' },
        { id: 2, name: 'Dogs', animal: 'Dogs' },
        { id: 3, name: 'Alpacas', animal: 'Alpacas' }
      ];
    },
    // Test function
    find(id) {
      return { id, name: 'Cats', animal: 'Cats' };
    },
    // Test function - inserts 1 new user record to database
    insertNewUserDemo() {
      const usersRef = ref.child('users');
      const newUserRef = usersRef.push();
      console.log();
      newUserRef.set({
        username: 'ginger',
        password: '123'
      });
    },
    // Test function - inserts 1 pet record into database
    insertDemoRecord() {
      const petsRef = ref.child('pets');
      petsRef.push().set({
        date_of_birth: 'June 23, 2018',
        full_name: 'Ginger Paws',
        nickname: 'Gingu'
      });
    }
  };
};
