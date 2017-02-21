var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var multipart = require('connect-multiparty');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(multipart);

consign()
    .include('app/routes')
    .then('config/dbMongo.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

app.use(function(err, req, res, next){
    res.status(404).render('errors/404');
    next;
});

app.use(function(err, req, res, next){
    res.status(500).render('errors/500');
});

module.exports = app;