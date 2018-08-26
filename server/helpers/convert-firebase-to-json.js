module.exports = function convertToJSONFormat(json) {
  // parses the firebase output of key + value to only values
  const convertedJson = Object.values(json.pets);

  return convertedJson;
};
