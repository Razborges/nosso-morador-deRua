var objectId = require('mongodb').ObjectID;

var InstituicaoDAO = function(connection) {
    this._connection = connection();
}

InstituicaoDAO.prototype.buscar = function(res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('instituicao', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.find().toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('instituicoes', { instituicoes : result} );
                mongoClient.close();
            });
        });
    });
}

InstituicaoDAO.prototype.cadastrar = function(instituicao, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('instituicao', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.insert(instituicao, function(err){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                mongoClient.close();
                res.redirect('/instituicoes');
            });
        });
    });
}

InstituicaoDAO.prototype.editar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('instituicao', function(err, collection){
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
                res.render('instituicao-atualizar', { instituicao : result[0] });
                mongoClient.close();
            });
        });
    });
}

InstituicaoDAO.prototype.atualizar = function(instituicao, res){
    var id = instituicao._id;
    delete instituicao._id;
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('instituicao', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.update(
                { _id : objectId(id) },
                { $set : instituicao },
                {},
                function(err){
                    if(err){
                        mongoClient.close();
                        console.log(err);
                        return;
                    }
                    res.redirect('/instituicoes');
                    mongoClient.close();
                }
            );
        });
    });
}

InstituicaoDAO.prototype.remover = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('instituicao', function(err, collection){
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
                res.redirect('/instituicoes');
                mongoClient.close();
            });
        });
    }); 
}

module.exports = function(){
    return InstituicaoDAO;
}