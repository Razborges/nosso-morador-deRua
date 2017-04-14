var objectId = require('mongodb').ObjectID;
var crypto = require('crypto');

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

UsuarioDAO.prototype.cadastrar = function(usuario, req, res){
    var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senha_criptografada;
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
                mongoClient.close();
                res.redirect('/usuario');
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
    var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senha_criptografada;
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
                    res.render('usuario');
                    mongoClient.close();
                }
            );
        });
    });
}

UsuarioDAO.prototype.remover = function(id, req, res){
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
                mongoClient.close();
                req.session.destroy(function(err){
                    if(err) {
                        console.log(err);
                        return;
                    }
                    res.redirect('/');
                });
            });
        });
    }); 
}

UsuarioDAO.prototype.autenticar = function(usuario, req, res){
    var senha_criptografada = crypto.createHash('md5').update(usuario.senha).digest('hex');
    usuario.senha = senha_criptografada;
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
                    req.session.ident = result[0]._id;
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

UsuarioDAO.prototype.alterarsenha = function(email, req, res) {
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
            collection.find(email).toArray(function(err, result){
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

module.exports = function(){
    return UsuarioDAO;
}