module.exports = function convertToJSONFormat(json) {
  const convertedJson = Object.values(json.pets);

  return convertedJson;
};
