const JSONAPISerializer = require('jsonapi-serializer').Serializer;

// serializes only specified attributes, type is first string
module.exports = new JSONAPISerializer('user', {
  attributes: ['id', 'lat', 'lng', 'adopted', 'username', 'pets', 'email']
});
