function MoradorDAO(connection){
    this._connection = connection();
}

MoradorDAO.prototype.cadastrar = function(morador){
    this._connection.open(function(err, mongoClient){
        if(err){
           console.log('Erro1 =====>', err);
            return;
        }
        mongoClient.collection('morador_rua', function(err, collection){
            if(err) {
                console.log('Erro2 =====>', err);
                return;
            }
            collection.insert(morador);
            mongoClient.close();
        });
    });
}

module.exports = function(){
    return MoradorDAO;
}