/*
DEBUG=world-express:* npm run devstart
*/

const express = require('express');

const router = express.Router();

// Требующиеся модули контроллеров.
const countryController = require('../controllers/countryController');

const regionController = require('../controllers/regionController');

const languageController = require('../controllers/languageController');

const populationController = require('../controllers/populationController');

let usersdata=[]

// Country ROUTES
console.log('start')
console.log(usersdata)
router.post ('/signup', (req, res) =>  {
    console.log('in')
    usersdata.push ({'username':req.body.username, 'password':req.body.password, 'country': req.body.country, 'travells': []})
    console.log(usersdata);
    res.send('You`ve signed up! Come to sign in')
});

router.delete ('/signup', (req, res) => {
    console.log('signin')
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
    console.log(usersdata)
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
/*
router.get ('/users/:username', (req,res) => {
    let user=usersdata.find (user => user.username===req.params.username)
    req.body.trav.map(trav => user.travells.push(trav))
    user.travells= new Set(user.travells)
    const list=[]
    user.travells.forEach (travel => list.push(travel))
    usersdata.find (user => user.username===req.params.username).travells=list
    console.log(usersdata)
})*/


// GET catalog home page
router.get('/', countryController.index);

// GET request for list of all countries.
router.get('/countries', countryController.country_list);

// GET request for list of all regions.
router.get('/regions', regionController.region_list);

// GET request for list of all languagies.
router.get('/languagies', languageController.language_list);

// GET request for sort by population.
router.get('/sort', populationController.population_sort);

// Get request for information about particular country
router.get('/countries/:name', countryController.country_detail);

router.get('/regions/:name', regionController.countries_of_region);

router.get('/languagies/:name', languageController.countries_of_language);
/*
// GET request to update BookInstance.
router.get('/bookinstance/:id/update', book_instance_controller.bookinstance_update_get);

// POST request to update BookInstance.
router.post('/bookinstance/:id/update', book_instance_controller.bookinstance_update_post);
*/
module.exports = router;
