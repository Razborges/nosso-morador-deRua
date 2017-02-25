module.exports.buscar = function(application, req, res){
    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.buscar(res);
}

module.exports.cadastro = function(application, req, res){
    res.render('instituicao_cadastro', { validacao : {}, instituicao : {} });
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Preenchimento obrigatório do nome da Instituição').notEmpty();

    var erros = req.validationErrors();

    if(erros) {
        res.render('instituicao_cadastro', {validacao : erros, instituicao : dadosForm});
        return;
    }

    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.cadastrar(dadosForm, res);
}

module.exports.editar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.editar(id, res); 
}

module.exports.atualizar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Preenchimento obrigatório do nome da Instituição').notEmpty();
    
    var erros = req.validationErrors();
    if(erros){
        res.render('instituicao_atualizar', { validacao : erros, instituicao : dadosForm});
        return;
    }

    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.atualizar(dadosForm, res);
}

module.exports.remover = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.remover(id, res);
}