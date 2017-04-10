module.exports = function(application){
    application.get('/usuarios', function(req, res){
        application.app.controllers.usuarioController.buscar(application, req, res);
    });

    application.get('/usuario/cadastro', function(req, res){
        application.app.controllers.usuarioController.cadastro(application, req, res);
    });

    application.post('/usuario', function(req, res){
        application.app.controllers.usuarioController.cadastrar(application, req, res);
    });

    application.get('/usuario/sair', function(req, res){
        application.app.controllers.usuarioController.sair(application, req, res);
    });

    application.get('/usuario/editar/:id', function(req, res){
        application.app.controllers.usuarioController.editar(application, req, res);
    });

    application.post('/usuario/:id', function(req, res){
        application.app.controllers.usuarioController.atualizar(application, req, res);
    });

    application.post('/usuario/remover/:id', function(req, res){
        application.app.controllers.usuarioController.remover(application, req, res);
    });

    application.get('/usuario/:id', function(req, res){
        application.app.controllers.usuarioController.detalhe(application, req, res);
    });
}