// temp data helper functions to return dummy data
import firebaseConverter from '../helpers/convert-json-to-firebase';

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
      return ref.once('value').then(snap => snap.val());
    },
    insertMultiplePets(jsonInput) {
      const petsRef = ref.child('pets');

      jsonInput = firebaseConverter(jsonInput);
      // const jsonInputCleaned = jsonInput;
      // res.JSON(jsonInputCleaned)

      function replacer(key, value) {
        if (value === undefined) {
          return '';
        }
        return value;
      }

      const jsonInputCleaned = JSON.parse(JSON.stringify(jsonInput, replacer));

      petsRef
        .set(jsonInputCleaned)
        .then(() => {
          console.log('Synchronization succeeded');
          return jsonInputCleaned;
        })
        .catch((error) => {
          console.log('Synchronization failed');
        });
    },
    insertDemoRecord() {
      const usersRef = ref.child('pets');
      usersRef.push().set({
        date_of_birth: 'June 23, 2018',
        full_name: 'Ginger Paws',
        nickname: 'Gingu'
      });
    }
  };
};
