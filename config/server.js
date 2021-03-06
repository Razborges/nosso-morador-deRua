var express = require('express');
var consign = require('consign');
var bodyParser = require('body-parser');
var validator = require('express-validator');
var expressSession = require('express-session');
var multiparty = require('connect-multiparty');

var app = express();

app.set('view engine', 'ejs');
app.set('views', './app/views');

app.use(express.static('./app/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(multiparty());
app.use(validator());
app.use(expressSession({
    secret: 's3gr3d0D@S3ss10n',
    resave: true,
    saveUninitialized: false
}));

//midleware verificando a sessao para filtrar links e informacoes do usuario
var verificarSessao = function (req, res, next) {
    var sessao = {};
    if(req.session.autorizado) {
        sessao.nome = req.session.nome;
        sessao.ident = req.session.ident;
        res.locals.sessao = sessao;
        next();
    } else {
        res.locals.sessao = sessao;
        next();
    }
};

app.use(verificarSessao);

consign()
    .include('app/routes')
    .then('config/dbMongo.js')
    .then('app/models')
    .then('app/controllers')
    .into(app);

app.use(function(req, res, next){
    res.status(404).render('./errors/404');
    next;
});

app.use(function(err, req, res, next){
    res.status(500).render('./errors/500');
    next;
});

module.exports = app;