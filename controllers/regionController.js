const countries = require('../data');


exports.region_list = function (req, res) {
  let regionslist = [];
  countries.map((country) => {
    regionslist.push(country.region)
  });
  const regions = new Set(regionslist);
  regionslist = [];
  regions.forEach(function(value) {
    if (value!=='') { 
      regionslist.push(value)}
    });
  res.jsonp(regionslist);
};

exports.countries_of_region = function (req, res, next) {
  const list = [];
  countries.map((country) => {
    if (country.region===req.params.name){
      list.push(country.name)}
    });
  res.jsonp(list);
};
