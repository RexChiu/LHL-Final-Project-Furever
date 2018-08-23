
const JSONAPISerializer = require('jsonapi-serializer').Serializer;

module.exports = new JSONAPISerializer('pets', {
  attributes: ['name', 'animal']
});
