var app = require('./config/server');
var port = 8000;

app.listen(port, function(){
    console.log('*** Servidor Morador de Rua ONLINE PORTA ' + port + ' ***');
});