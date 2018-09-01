const JSONAPISerializer = require('jsonapi-serializer').Serializer;

// serializes only specified attributes, type is first string
module.exports = new JSONAPISerializer('events', {
  attributes: ['user', 'userId', 'location', 'description', 'id', 'title', 'date', 'going']
});
