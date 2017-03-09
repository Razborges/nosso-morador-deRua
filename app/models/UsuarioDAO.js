var objectId = require('mongodb').ObjectID;

var UsuarioDAO = function(connection) {
    this._connection = connection();
}

UsuarioDAO.prototype.buscar = function(res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('usuario', function(err, collection){
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
                res.render('usuarios', { usuarios : result} );
                mongoClient.close();
            });
        });
    });
}

UsuarioDAO.prototype.cadastrar = function(usuario, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('usuario', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.insert(usuario, function(err){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                mongoClient.close();
                res.redirect('/usuarios');
            });
        });
    });
}

UsuarioDAO.prototype.editar = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('usuario', function(err, collection){
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
                res.render('usuario-atualizar', { usuario : result[0] });
                mongoClient.close();
            });
        });
    });
}

UsuarioDAO.prototype.atualizar = function(usuario, res){
    var id = usuario._id;
    delete usuario._id;
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('usuario', function(err, collection){
            if(err){
                mongoClient.close();
                console.log(err);
                return;
            }
            collection.update(
                { _id : objectId(id) },
                { $set : usuario },
                {},
                function(err){
                    if(err){
                        mongoClient.close();
                        console.log(err);
                        return;
                    }
                    res.redirect('/usuarios');
                    mongoClient.close();
                }
            );
        });
    });
}

UsuarioDAO.prototype.remover = function(id, res){
    this._connection.open(function(err, mongoClient){
        if(err){
            console.log(err);
            return;
        }
        mongoClient.collection('usuario', function(err, collection){
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
                res.redirect('/usuarios');
                mongoClient.close();
            });
        });
    }); 
}

module.exports = function(){
    return UsuarioDAO;
}