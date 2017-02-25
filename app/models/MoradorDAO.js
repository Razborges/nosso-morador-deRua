var objectId = require('mongodb').ObjectID;

function MoradorDAO(connection){
    this._connection = connection();
}

MoradorDAO.prototype.cadastrar = function(morador, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.insert(morador, function(err, result){
                if(err) {
                    mongoClient.close();
                    console.log('Erro3 =====>', err);
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
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.find().toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log('Erro3 =====>', err);
                    return;
                }
                res.render('moradores', { moradores : result });
                mongoClient.close();
            });
        });
    });
}

MoradorDAO.prototype.buscar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.find(objectId(id)).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log('Erro3 =====>', err);
                    return;
                }
                res.render('morador_rua', { morador : result[0] });
                mongoClient.close();
            });
        });
    });  
}

MoradorDAO.prototype.editar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.find(objectId(id)).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log('Erro3 =====>', err);
                    return;
                }
                res.render('morador_atualizar', { morador : result[0] });
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
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.update(
                { _id: objectId(id) },
                { $set : morador },
                {},
                function(err, result){
                    if(err) {
                        mongoClient.close();
                        console.log('Erro3 =====>', err);
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
            console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                mongoClient.close();
                console.log('Erro2 =====>', err);
                return;
            }
            collection.remove({ _id : objectId(id) }, function(err, result){
                if(err){
                    mongoClient.close();
                    console.log('Erro3 =====>', err);
                    return;
                }
                res.redirect('/morador');
                mongoClient.close();
            });
        });
    }); 
}

module.exports = function(){
    return MoradorDAO;
}