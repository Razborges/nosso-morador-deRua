module.exports = function(application) {
    
    application.get('/', function(req, res) {
        application.app.controllers.indexController.index(application, req, res);
    });
    
    application.post('/autenticar', function(req, res) {
        application.app.controllers.indexController.autenticar(application, req, res);
    });
}