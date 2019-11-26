const countries = [];
const axios = require('axios');

axios.get('https://restcountries.eu/rest/v2/all')
  .then((response) => {
    response.data.map((country) => {
      countries.push(country);
    });
  })
  .catch((err) => {console.log(err)});
module.exports = countries;
