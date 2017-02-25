exports.listar = function(application, req, res){
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.listar(res);
}

exports.cadastro = function(application, req, res){
    res.render('cadastro_morador', { validacao: {}, morador: {} });
}

exports.cadastrar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'É obrigatório o preenchimento do nome').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('cadastro_morador', { validacao: erros, morador: dadosForm });
        return;
    }

    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.cadastrar(dadosForm, res);
}

exports.buscar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.buscar(id, res);
}

exports.editar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.editar(id, res);
}

exports.atualizar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'É obrigatório o preenchimento do nome').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('morador_atualizar', { validacao: erros, morador: dadosForm });
        return;
    }

    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.atualizar(dadosForm, res);
}

exports.remover = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.remover(id, res);
}