import express from 'express';
import VetsSerializer from '../serializers/vets';
import vetfinder from '../api/vetfinder';

const router = express.Router();

/* GET index page. */
module.exports = (dataHelpers) => {
  /* GET places page. */
  router.get('/places', async (req, res) => {
    const options = {
      location: req.query.location,
      type: req.query.type,
      radius: req.query.radius,
      keyword: req.query.keyword
    };
    // console.log('Line32', req.query);
    try {
      const result = await vetfinder('nearbysearch', options);
      const jsonOutput = VetsSerializer.serialize(result);
      res.json(jsonOutput);
      // res.json(result);
    } catch (e) {
      console.log('Error', e);
      res.json(e);
    }
  });
  return router;
};
