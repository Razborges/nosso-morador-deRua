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
            collection.insert(usuario, function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                var id = result.ops[0]._id;
                mongoClient.close();
                res.redirect('/usuario/' + id);
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
                res.render('usuario-atualizar', { usuario : result[0], validacao: {} });
                mongoClient.close();
            });
        });
    });
}

UsuarioDAO.prototype.atualizar = function(usuario, res){
    var id = usuario.id;
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

UsuarioDAO.prototype.detalhe = function(id, res){
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
            collection.find(objectId(id)).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                res.render('usuario', { usuario : result[0] });
                mongoClient.close();
            });
        });
    }); 
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
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
            collection.find(usuario).toArray(function(err, result){
                if(err){
                    mongoClient.close();
                    console.log(err);
                    return;
                }
                mongoClient.close();
                if(result[0] != undefined){
                    req.session.autorizado = true;
                    req.session.email = result[0].email;
                    req.session.nome = result[0].nome;
                }

                if(req.session.autorizado){
                    res.redirect('/');
                } else {
                    var erros = [ {
                        param: '',
                        msg: '- Usuário não encontrado, verifique o e-mail e a senha, ou cadastre-se no formulário ao lado.',
                        value: ''
                    }];
                    res.render('usuario-cadastro', { validacao : erros, usuario: {} });
                }
            });
        });
    });
}

module.exports = function(){
    return UsuarioDAO;
}