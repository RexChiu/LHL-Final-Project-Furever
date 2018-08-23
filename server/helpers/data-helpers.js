// temp data helper functions to return dummy data
module.exports = function makeDataHelpers(db) {
  var ref = db.ref("restricted_access/secret_document");

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
      return ref.once('value')
        .then(function (snap) {
          return snap.val();
        })      
    },
    insertDemoRecord() {
      var usersRef = ref.child("pets");
      usersRef.push().set({
        "date_of_birth": "June 23, 2018",
        "full_name": "Ginger Paws",
        "nickname": "Gingu"
      });
    }
  };
};
