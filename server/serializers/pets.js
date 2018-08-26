const JSONAPISerializer = require('jsonapi-serializer').Serializer;

// serializes only specified attributes, type is first string
module.exports = new JSONAPISerializer('pets', {
  attributes: [
    'age',
    'animal',
    'breeds',
    'contact',
    'description',
    'lastUpdate',
    'mix',
    'name',
    'options',
    'media',
    'sex',
    'shelterId',
    'size',
    'status'
  ]
});
