var mongo = require('mongodb');

var mongoConn = function(){
    console.log('---Conenctando ao MongoDB---');

    var db = new mongo.Db(
        morador_rua,
        new mongo.Server(
            'localhost',
            27017,
            {}
        ),
        {}
    );
    return db;
};

module.exports = function(){
    return mongoConn;
};