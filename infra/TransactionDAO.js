function TransactionDAO(connection) {
    this._connection = connection;
}

TransactionDAO.prototype.allTransaction = function (callback) {
    this._connection.query('SELECT * FROM Transaction', callback);
}

module.exports = function () {
    return TransactionDAO;
};
