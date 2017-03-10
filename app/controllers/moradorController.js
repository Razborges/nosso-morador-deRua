module.exports.listar = function(application, req, res){
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.listar(res);
}

module.exports.cadastro = function(application, req, res){
    res.render('morador-cadastro', { validacao: {}, morador: {} });
}

module.exports.cadastrar = function(application, req, res){
    var data_cadastro = new Date();

        console.log(req.body);
        var dadosForm = req.body;

        req.assert('nome', '- É obrigatório o preenchimento do nome').notEmpty();
        req.assert('cidade', '- É obrigatório o preenchimento da cidade').notEmpty();
        req.assert('uf', '- É obrigatório o preenchimento do estado').notEmpty();
        req.assert('uf', '- Selecione uma opção válida de UF').len(2, 2);
        req.assert('historico', '- É obrigatório o preenchimento do histórico').notEmpty();
        req.assert('historico', '- O histórico precisa ter pelo menos 30 caracteres').len(30, 1000);

        var erros = req.validationErrors();

        if(erros){
            res.render('morador-cadastro', { validacao: erros, morador: dadosForm });
            return;
        }

        dadosForm.foto = [];
        dadosForm.necessidades = [];
        dadosForm.data_cadastro = data_cadastro;

        var conn = application.config.dbMongo;
        var moradorDao = new application.app.models.MoradorDAO(conn);
        moradorDao.cadastrar(dadosForm, res);
}

module.exports.buscar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.buscar(id, res);
}

module.exports.editar = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.editar(id, res);
}

module.exports.atualizar = function(application, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'É obrigatório o preenchimento do nome').notEmpty();

    var erros = req.validationErrors();

    if(erros){
        res.render('morador-atualizar', { validacao: erros, morador: dadosForm });
        return;
    }

    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.atualizar(dadosForm, res);
}

module.exports.remover = function(application, req, res){
    var id = req.params.id;
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.remover(id, res);
}