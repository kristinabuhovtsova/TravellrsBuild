
const express = require('express');

const router = express.Router();

const countryController = require('../controllers/countryController');

const regionController = require('../controllers/regionController');

const languageController = require('../controllers/languageController');

const populationController = require('../controllers/populationController');

let usersdata=[]

router.post ('/signup', (req, res) =>  {
    usersdata.push ({'username':req.body.username, 'password':req.body.password, 'country': req.body.country, 'travells': []})
    res.send('You`ve signed up! Come to sign in')
});

router.delete ('/signup', (req, res) => {
    const newdata=[]
    usersdata.map (user => {
        if (user.username!==req.query.username) {
         newdata.push(user)}})
    usersdata=newdata
})

router.put ('/signup', (req, res) => {
    newdata=[]
    usersdata.map (user => {
        if (user.username===req.body.oldname) {
         newdata.push ({'username': req.body.newname, 'password': user.password, 'country': user.country, 'travells': user.travells})
        }
    else {
        newdata.push(user)
    }})
    usersdata=newdata
})

router.get ('/reqsignin', (req, res) =>  {
    let find=0
     usersdata.forEach (function (user) {
        if (user.username===req.query.username){
            if (user.password===req.query.password){
                find=user.country
               }
     }})
     if (find === 0) { 
        res.send('0') }
     else{ res.send(find) }
});

router.post ('/users/:username', (req,res) => {
    let user=usersdata.find (user => user.username===req.params.username)
    req.body.trav.map(trav => user.travells.push(trav))
    user.travells= new Set(user.travells)
    const list=[]
    user.travells.forEach (travel => list.push(travel))
    usersdata.find (user => user.username===req.params.username).travells=list
    res.jsonp (list)
})

router.get ('/users', (req,res) =>  {
    let list=[]
    usersdata.forEach (user => list.push(user.username))
    res.jsonp (list)
})

router.get ('/statistics', (req, res) => {
    const list=[]
    usersdata.forEach(user => list.push({'username': user.username, 'usercountry': user.country, 'viscountries': user.travells}))
    res.jsonp(list)
})
router.get('/regions', regionController.region_list);

router.get('/languagies', languageController.language_list);

router.get('/sort', populationController.population_sort);

router.get ('/countries', countryController.country_list)

router.get('/countries/:name', countryController.country_detail);

router.get('/regions/:name', regionController.countries_of_region);

router.get('/languagies/:name', languageController.countries_of_language);

module.exports = router;
