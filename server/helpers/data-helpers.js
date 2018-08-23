// temp data helper functions to return dummy data
module.exports = function makeDataHelpers(dbURL) {
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
    }
  };
};
