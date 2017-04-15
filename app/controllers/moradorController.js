var fs = require('fs');

module.exports.listar = function(application, req, res){
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.listar(res);
}

module.exports.cadastro = function(application, req, res){
        res.render('morador-cadastro', { validacao: {}, morador: {} });
}

module.exports.cadastrar = function(application, req, res){
    if(req.session.autorizado) {
        var data_cadastro = new Date();
        var timeStamp = data_cadastro.getTime();

        var dadosForm = req.body;

        req.assert('nome', '- É obrigatório o preenchimento do nome').notEmpty();
        req.assert('cidade', '- É obrigatório o preenchimento da cidade').notEmpty();
        req.assert('uf', '- É obrigatório o preenchimento do estado').notEmpty();
        req.assert('uf', '- Selecione uma opção válida de UF').len(2, 2);
        req.assert('historico', '- É obrigatório o preenchimento do histórico').notEmpty();
        req.assert('historico', '- O histórico precisa ter entre 30 e 3500 caracteres.').len(30, 3500);

        var erros = req.validationErrors();

        if(erros){
            res.render('morador-cadastro', { validacao: erros, morador: dadosForm });
            return;
        }

        var pathOrigem = req.files.foto.path;
        var nomeImagem = timeStamp + req.files.foto.originalFilename;
        var pathDestino = './app/public/uploads/' + nomeImagem;

        fs.rename(pathOrigem, pathDestino, function(err){
            if(err){
                res.status(500);
                return;
            }
            delete req.files;
        });

        dadosForm.foto = nomeImagem;
        dadosForm.necessidades = [];
        dadosForm.info = [];
        dadosForm.data_cadastro = data_cadastro;

        var conn = application.config.dbMongo;
        var moradorDao = new application.app.models.MoradorDAO(conn);
        moradorDao.cadastrar(dadosForm, res);
    } else {
        var erros = [ {
            param: '',
            msg: '- É necessário efetuar o login/cadastro para acessar esse link.',
            value: ''
        }];
        res.render('morador-cadastro', { validacao : erros, morador: {} });
    }
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
    var moradorDAO = new application.app.models.MoradorDAO(conn);
    moradorDAO.editar(id, res);
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

module.exports.necessidades = function(application, req, res) {
    if(req.session.autorizado) {
        var id = req.params.id;

        req.assert('necessidade', '- É obrigatório o preenchimento da necessidade').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('/morador/' + id);
            return;
        }

        var necessidade = req.body.necessidade;
        var conn = application.config.dbMongo;
        var moradorDao = new application.app.models.MoradorDAO(conn);
        moradorDao.necessidades(id, necessidade, req, res);
    } else {
        var erros = [ {
            param: '',
            msg: '- É necessário efetuar o login/cadastro para acessar esse link.',
            value: ''
        }];
        res.render('usuario-cadastro', { validacao : erros, usuario: {} });
    }
}

module.exports.info = function(application, req, res) {
    if(req.session.autorizado) {
        var id = req.params.id;

        req.assert('tipo_info', '- É obrigatório selecionar o tipo de informação.').notEmpty();
        req.assert('info', '- É obrigatório o preenchimento da informação').notEmpty();
        req.assert('instituicao', '- É obrigatório preencher o nome da instituição').notEmpty();
        req.assert('data', '- É obrigatório o preenchimento da data da ocorrência').notEmpty();

        var erros = req.validationErrors();

        if(erros){
            res.redirect('/morador/' + id);
            return;
        }

        var info = {
            tipo: req.body.tipo_info,
            info: req.body.info,
            instituicao: req.body.instituicao,
            data: req.body.data
        }
        var conn = application.config.dbMongo;
        var moradorDao = new application.app.models.MoradorDAO(conn);
        moradorDao.info(id, info, req, res);
    } else {
        var erros = [ {
            param: '',
            msg: '- É necessário efetuar o login/cadastro para acessar esse link.',
            value: ''
        }];
        res.render('usuario-cadastro', { validacao : erros, usuario: {} });
    }
}