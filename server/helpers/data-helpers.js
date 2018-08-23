module.exports = function makeDataHelpers(dbURL) {
  return {
    findAll() {
      return [
        { id: 1, name: 'Cats', type: 'Cats' },
        { id: 2, name: 'Dogs', type: 'Dogs' },
        { id: 3, name: 'Alpacas', type: 'Alpacas' }
      ];
    },
    find(id) {
      return { id: 1, name: 'Cats', type: 'Cats' };
    }
  };
};
