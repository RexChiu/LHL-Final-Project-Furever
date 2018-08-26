// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';
import jsonConverter from '../helpers/convert-firebase-to-json';

module.exports = function makeDataHelpers(db) {
  const ref = db.ref('restricted_access/secret_document');

  return {
    findAll() {
      return [
        { id: 1, name: 'Cats', animal: 'Cats' },
        { id: 2, name: 'Dogs', animal: 'Dogs' },
        { id: 3, name: 'Alpacas', animal: 'Alpacas' }
      ];
    },
    find(id) {
      return { id, name: 'Cats', animal: 'Cats' };
    },
    returnPetDescription() {
      return ref.once('value').then(snap => snap.val());
    },
    returnAll() {
      return ref.once('value').then(snap => jsonConverter(snap.val()));
    },
    insertMultiplePets(jsonInput) {
      const petsRef = ref.child('pets');

      const jsonInputCleaned = firebaseConverter(jsonInput);

      // uncomment below if anymore undefined in firebaseConverter data

      // const jsonInputCleaned = jsonInput;
      // res.JSON(jsonInputCleaned)

      // function replacer(key, value) {
      //   if (value === undefined) {
      //     return '';
      //   }
      //   return value;
      // }

      // const jsonInputCleaned = JSON.parse(JSON.stringify(jsonInput, replacer));

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
            console.log('Value of exists ', exists);
            resolve(exists);
          });
      });
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
    insertNewUserDemo() {
      const usersRef = ref.child('users');
      const newUserRef = usersRef.push();
      console.log();
      newUserRef.set({
        username: 'ginger',
        password: '123'
      });
    },
    insertNewUser(newUser) {
      const usersRef = ref.child('users');
      const newUserRef = usersRef.push();
      console.log();
      return newUserRef.set(newUser).then(() => newUserRef.key);
    },
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
