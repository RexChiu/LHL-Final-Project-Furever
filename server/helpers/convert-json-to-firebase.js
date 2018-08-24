module.exports = function convertToFirebaseFormat(json) {
  const convertedJson = {};

  json.pet.forEach((elem) => {
    convertedJson[elem.id] = elem;
  });

  return convertedJson;
};
