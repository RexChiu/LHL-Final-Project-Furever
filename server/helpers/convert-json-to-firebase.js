module.exports = function convertToFirebaseFormat(json) {
  const convertedJson = {};

  json.forEach((elem) => {
    convertedJson[elem.id] = elem;
  });

  return convertedJson;
};
