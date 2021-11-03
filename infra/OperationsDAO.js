function OperationsDAO(connection) {
    this._connection = connection;
}

OperationsDAO.prototype.save = function (operation, callback) {
    this._connection.query('INSERT INTO Operations SET ?', operation, callback);
}

OperationsDAO.prototype.getOperations = function (callback, rows) {
    this._connection.query("SELECT * FROM Operations", callback, rows);
}
 
module.exports = function () {
    return OperationsDAO;
};
 