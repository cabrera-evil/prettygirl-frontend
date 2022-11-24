var express = require('express');
var router = express.Router();
require ('dotenv').config();

const {connect} = require('../config/database');
const mongodb = connect();


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'PrettyGirl - API' });
});

module.exports = router;
