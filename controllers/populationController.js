const countries = require('../data');

// Display sort by population.
exports.population_sort = function (req, res) {
  const list = [];
  countries.map((country) => {
    list.push({'country': country.name,'population': country.population})
  });
  function comparePop(a, b) {
    return  b.population - a.population;
  }
  list.sort(comparePop);
  res.jsonp(list);
};
