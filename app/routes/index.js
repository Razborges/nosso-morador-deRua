module.exports = function(application) {
    
    application.get('/', function(req, res) {
        application.app.controllers.indexController.index(application, req, res);
    });
    
    application.post('/autenticar', function(req, res) {
        application.app.controllers.indexController.autenticar(application, req, res);
    });

    application.get('/novasenha', function(req, res) {
        application.app.controllers.indexController.novasenha(application, req, res);
    });

    application.post('/alterarsenha', function(req, res){
        console.log('rota alterar senha');
        application.app.controllers.indexController.alterarsenha(application, req, res);
    });
}