const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send(true)
})

app.listen(3000, '0.0.0.0', function (err, result) {
    if (err) {
      console.log(err);
    }

    console.log('Running at http://0.0.0.0:3000');
  });