import rp from 'request-promise-native';
import queryString from 'query-string';
import parser from 'fast-xml-parser';

// https://api.shop.com:8443/

module.exports = function APICall(method, params) {
  // specifies the uri endpoint to make a request to
  // let uri = `https://api.shop.com:8443/sites/v1/search/Term/${method}`;
  const url = `https://api.shop.com:8443/AffiliatePublisherNetwork/v1/products/${method}`;

  // if params is not defined, set it to be an empty object
  params = params || {};

  // adds the api key to the params, and converts any params into query strings
  params.key = process.env.SHOP_APIKEY;
  const query = queryString.stringify(params);
  uri += `?${query}`;

  // uri = 'https://api.shop.com:8443//v1/products?publisherID=TEST&locale=en_US&perPage=15';

  console.log(uri);

  return rp(uri)
    .then(result)
    .catch(err => err);
};
