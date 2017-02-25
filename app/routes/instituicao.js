module.exports = function(application){

    application.get('/instituicoes', function(req, res){
        application.app.controllers.instituicaoController.buscar(application, req, res);
    });

    application.get('/instituicao/cadastro', function(req, res){
        application.app.controllers.instituicaoController.cadastro(application, req, res);
    });

    application.post('/instituicao', function(req, res){
        application.app.controllers.instituicaoController.cadastrar(application, req, res);
    });

    application.get('/instituicao/editar/:id', function(req, res){
        application.app.controllers.instituicaoController.editar(application, req, res);
    });

    application.post('/instituicao/:id', function(req, res){
        application.app.controllers.instituicaoController.atualizar(application, req, res);
    });

    application.post('/instituicao/remover/:id', function(req, res){
        application.app.controllers.instituicaoController.remover(application, req, res);
    });
}