module.exports.buscar = function(application, req, res){
    var conn = application.config.dbMongo;
    var instDAO = new application.app.models.InstituicaoDAO(conn);
    instDAO.buscar(res);
}

module.exports.cadastro = function(application, req, res){
    res.render('instituicao-cadastro', { validacao : {}, instituicao : {} });
}

module.exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'Preenchimento obrigatório do nome da Instituição').notEmpty();
    req.assert('responsavel', 'Preenchimento obrigatório do nome do Responsável da Instituição').notEmpty();
    req.assert('email', '- Necessário utilizar um e-mail válido').notEmpty().isEmail();
    req.assert('telefone', 'Preenchimento obrigatório do telefone').notEmpty();
    req.assert('telefone', 'Telefone deve ter DDD e, com isso entre 10 e 11 caracteres.').len(14, 15);//parenteses e traço
    req.assert('senha', '- Preenchimento obrigatório').notEmpty();
    req.assert('senha', '- A senha deve ter entre 6 e 20 caracteres').len(6, 20);
    req.assert('re_senha', '- Preenchimento obrigatório').notEmpty();
    req.assert('re_senha', '- Deve ser igual a senha e ter de 6 a 20 caracteres').len(6, 20);
    req.assert('re_senha', '- Deve ser igual a senha').equals(dadosForm.senha);

    var erros = req.validationErrors();

    if(erros) {
        res.render('instituicao-cadastro', {validacao : erros, instituicao : dadosForm});
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
        res.render('instituicao-atualizar', { validacao : erros, instituicao : dadosForm});
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