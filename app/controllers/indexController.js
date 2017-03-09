module.exports.index = function(application, req, res) {
    var conn = application.config.dbMongo;
    var moradorDao = new application.app.models.MoradorDAO(conn);
    moradorDao.home(res);
}