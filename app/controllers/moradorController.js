exports.listar = function(application, req, res){
        res.render('listagem_morador', { moradores : result });
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

    moradorDao.cadastrar(dadosForm);

    res.send('podemos cadastrar')
    //res.redirect('/morador');
}

exports.editar = function(application, req, res){
    res.render('editar_morador', { morador: result });
}

exports.atualizar = function(application, req, res){
    res.redirect('/morador');
}

exports.remover = function(application, req, res){
    res.redirect('/morador');
}

/*
module.exports.cadastro = function(app, req, res) {
    res.render('cadastro_morador', { validacao : {}, data : {} });
};

module.exports.cadastrar = function(app, req, res){
    var dadosForm = req.body;

    req.assert('nome', 'É obrigatório o preenchimento do nome').notEmpty();
    req.assert('nome', 'O nome precisa ter entre 3 e 100 caracteres').len(3, 100);
    req.assert('cidade', 'É obrigatório o preenchimento do nome da Cidade').notEmpty();
    req.assert('cidade', 'O nome da Cidade deve ter entre 3 a 60 caracteres').len(3, 60);
    req.assert('uf', 'O preenchimento do Estado/UF é obrigatório com 2 caracteres').notEmpty().len(2, 2);
    req.assert('historico', 'Conte um pouco da história deste morador de rua.').notEmpty();

    var errorValidacao = req.validationErrors();

    if (errorValidacao) {
        res.render('cadastro_morador', { validacao : errorValidacao, data : dadosForm });
        return;
    }

    var conn = app.config.dbMongo;

    console.log(conn);
    var moradorDao = new app.app.models.MoradorDAO(conn);
    console.log(4);
    moradorDao.inserirMorador(dadosForm);
    console.log(5);
    console.log(moradorDao);
    console.log('chegou na listagem de morador de rua');
    //res.render('listagem_morador');
};
*/