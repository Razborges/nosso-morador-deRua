module.exports.buscar = function(application, req, res){
    var conn = application.config.dbMongo;
    var usuarioDAO = new application.app.models.UsuarioDAO(conn);
    usuarioDAO.buscar(res);
}

module.exports.cadastro = function(application, req, res){
    res.render('usuario-cadastro', { validacao : {}, instituicao : {} });
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Preenchimento obrigatório do nome').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render('usuario-cadastro', {validacao : erros, instituicao : dadosForm});
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