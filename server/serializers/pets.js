const JSONAPISerializer = require('jsonapi-serializer').Serializer;

// serializes only specified attributes, type is first string
module.exports = new JSONAPISerializer('pets', {
  attributes: [
    'age',
    'animal',
    'breed',
    'contact',
    'description',
    'lastUpdate',
    'mix',
    'name',
    'options',
    'photos',
    'sex',
    'shelterId',
    'size',
    'status'
  ]
});
