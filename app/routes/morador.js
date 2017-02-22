module.exports = function(application){

    application.get('/morador', function(req, res){
        application.app.controllers.moradorController.listar(application, req, res);
    });

    application.get('/morador/cadastro', function(req, res){
        application.app.controllers.moradorController.cadastro(application, req, res);
    });

    application.post('/morador', function(req, res){
        application.app.controllers.moradorController.cadastrar(application, req, res);
    });

    application.get('/morador/:id', function(req, res){
        application.app.controllers.moradorController.editar(application, req, res);
    });

    application.put('/morador/:id', function(req, res){
        application.app.controllers.moradorController.atualizar(application, req, res);
    });

    application.delete('/morador/:id', function(req, res){
        application.app.controllers.moradorController.remover(application, req, res);
    });
}