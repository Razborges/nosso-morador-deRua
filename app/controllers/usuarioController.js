module.exports.buscar = function(application, req, res){
    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.buscar(res);
}

module.exports.cadastro = function(application, req, res){
    res.render('usuario-cadastro', { validacao : {}, usuario : {} });
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', '- Preenchimento obrigatório do nome').notEmpty();
    req.assert('email', '- Necessário utilizar um e-mail válido').notEmpty().isEmail();
    req.assert('senha', '- Preenchimento obrigatório').notEmpty();
    req.assert('senha', '- A senha deve ter entre 6 e 20 caracteres').len(6, 20);
    req.assert('re_senha', '- Preenchimento obrigatório').notEmpty();
    req.assert('re_senha', '- Deve ser igual a senha e ter de 6 a 20 caracteres').len(6, 20);
    req.assert('re_senha', '- Deve ser igual a senha').equals(dadosForm.senha);

    var erros = req.validationErrors();
    if(erros) {
        res.render('usuario-cadastro', {validacao : erros, usuario : dadosForm});
        return;
    }

    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.cadastrar(dadosForm, res);
}

module.exports.editar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.editar(id, res); 
}

module.exports.atualizar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Preenchimento obrigatório do nome').notEmpty();
    
    var erros = req.validationErrors();
    if(erros){
        res.render('usuario-atualizar', { validacao : erros, instituicao : dadosForm});
        return;
    }

    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.atualizar(dadosForm, res);
}

module.exports.remover = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.remover(id, res);
}

module.exports.detalhe = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.detalhe(id, res);
}