var objectId = require('mongodb').ObjectID;

function MoradorDAO(connection){
    this._connection = connection();
}

MoradorDAO.prototype.cadastrar = function(morador, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.insert(morador, function(err, result){
                if(err) {
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                var id = result.ops[0]._id;
                mongoClient.close();
                res.redirect('/morador/' + id);
            });
        });
    });
}

MoradorDAO.prototype.listar = function(res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.find().hint({ $natural: -1 }).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('moradores', { usuario : {}, moradores : result });
                mongoClient.close();
            });
        });
    });
}

MoradorDAO.prototype.buscar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.find(objectId(id)).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('morador', { morador : result[0] });
                mongoClient.close();
            });
        });
    });  
}

MoradorDAO.prototype.editar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.find(objectId(id)).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('morador-atualizar', { validacao: {}, morador : result[0] });
                mongoClient.close();
            });
        });
    });
}

MoradorDAO.prototype.atualizar = function(morador, res){
    var id = morador._id;
    delete morador._id;
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.update(
                { _id: objectId(id) },
                { $set : morador },
                {},
                function(err, result){
                    if(err) {
                        mongoClient.close();
                        console.log(err);
                        return;
                    }
                    mongoClient.close();
                    res.redirect('/morador/' + id);
                });
            });
    });
}

MoradorDAO.prototype.remover = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.remove({ _id : objectId(id) }, function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.redirect('/morador');
                mongoClient.close();
            });
        });
    }); 
}

MoradorDAO.prototype.home = function(res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.find().hint({ $natural: -1 }).limit(3).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('index', { validacao : {}, usuario : {}, moradores : result });
                mongoClient.close();
            });
        });
    });
}

MoradorDAO.prototype.necessidades = function(id, necessidade, req, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.update(
                { _id: objectId(id) },
                { $push : { necessidades: necessidade }},
                {},
                function(err, result){
                    if(err) {
                        mongoClient.close();
                        console.log(err);
                        return;
                    }
                    mongoClient.close();
                    res.redirect('/morador/' + id);
            });
        });
    });
}

MoradorDAO.prototype.info = function(id, info, req, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.update(
                { _id: objectId(id) },
                { $push : { 
                    info: {
                        id_info: new objectId(),
                        tipo: info.tipo,
                        info: info.info,
                        instituicao: info.instituicao,
                        data: info.data
                    }
                }},
                {},
                function(err, result){
                    if(err) {
                        mongoClient.close();
                        console.log(err);
                        return;
                    }
                    mongoClient.close();
                    res.redirect('/morador/' + id);
            });
        });
    });
}

module.exports = function(){
    return MoradorDAO;
}