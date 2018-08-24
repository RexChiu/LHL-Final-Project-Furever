// temp data helper functions to return dummy data
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
    returnAll() {
      return ref.once('value').then(snap => snap.val());
    },
    insertMultiple(jsonInput) {
      const petsRef = ref.child('pets');

      petsRef.set(jsonInput);
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
