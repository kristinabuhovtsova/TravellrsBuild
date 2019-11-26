const countries = require("../data")

// Display list of all regions.
exports.language_list = function(req, res) {
        let langlist=[]
        countries.map((country) => {
            let lg=country.languages
            lg.map ((onelang) => {
                langlist.push(onelang.name)
            })
        });
        alllang= new Set(langlist)
        langlist=[]
        alllang.forEach(function(value){
            if (value!=='') {
                langlist.push(value)};
        })
        res.jsonp(langlist)
};

//Display list of countries in which people speak a particular language 
exports.countries_of_language = function(req, res, next) {
        let list=[]
        countries.map((country) => {
            let lg=country.languages
            let langlist=[]
            lg.map ((onelang) => {
                langlist.push(onelang.name)
            })
            langlist.forEach (function(value){
                if (value===req.params.name) {
                    list.push(country.name)};
            })
            })
        res.jsonp(list);
};
