var mongo = require('mongodb');

var conn = function(){
    var db = new mongo.Db(
        'nosso_morador_rua',
        new mongo.Server('localhost', 27017, {}),
        {}
    );
    console.log('--- Conectou ao MongoDB ---');
    return db;
}

module.exports = function(){
    return conn;
}
