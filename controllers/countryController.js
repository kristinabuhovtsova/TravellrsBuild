const countries = require('../data');

exports.index = function (req, res) {
  res.render('index');
};

exports.country_list = function (req, res) {
  const countrieslist = [];
  countries.map((country) => {
    countrieslist.push(country.name);
  });
  res.jsonp(countrieslist)

};

exports.country_detail = function (req, res) {
  let list;
  countries.map((country) => {
    if (country.name === req.params.name){
      list = { 'name': country.name, 'region': country.region, 'population': country.population, 'area': country.area, 'neighbours': country.borders, 'capital': country.capital, 'currency': country.currencies[0].name, 'flag' : country.flag}
    }});

  res.jsonp(list);
};
