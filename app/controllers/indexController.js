module.exports.index = function(application, req, res) {
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.home(res);
}

module.exports.autenticar = function(application, req, res) {
    var dadosForm = req.body;

    req.assert('email', '- Necessário utilizar um e-mail válido').notEmpty().isEmail();
    req.assert('senha', '- Preenchimento obrigatório').notEmpty();
    req.assert('senha', '- A senha deve ter entre 6 e 20 caracteres').len(6, 20);

    var erros = req.validationErrors();
    if(erros) {
        res.render('usuario-cadastro', { validacao : erros, usuario: {} });
        return;
    }

    var conn = application.config.dbMongo;
    var usuarioDao = new application.app.models.UsuarioDAO(conn);
    usuarioDao.autenticar(dadosForm, req, res);
}