import rp from 'request-promise-native';
import queryString from 'query-string';
import parser from 'fast-xml-parser';

module.exports = function APICall(method, params) {
  // specifies the uri endpoint to make a request to
  let uri = `https://maps.googleapis.com/maps/api/place/${method}/json`;

  // if params is not defined, set it to be an empty object
  params = params || {};

  // adds the api key to the params, and converts any params into query strings
  params.key = process.env.GOOGLEPLACES_APIKEY;
  const query = queryString.stringify(params);

  uri += `?${query}`;

  return rp(uri)
    .then(result => JSON.parse(result))
    .catch(err => err);
};
