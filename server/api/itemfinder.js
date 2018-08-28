import rp from 'request-promise-native';
import queryString from 'query-string';
import parser from 'fast-xml-parser';

module.exports = function APICallItem(method, params) {
  // specifies the uri endpoint to make a request to
  let uri = `https://api.shop.com/${method}`;

  // if params is not defined, set it to be an empty object
  params = params || {};

  // adds the api key to the params, and converts any params into query strings
  params.key = process.env.ITEMFINDER_APIKEY;
  const query = queryString.stringify(params);
  uri += `?${query}`;

  return rp(uri)
    .then(result => parser.parse(result))
    .catch(err => err);
};
