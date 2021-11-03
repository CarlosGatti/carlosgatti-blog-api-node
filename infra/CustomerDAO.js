function CustomerDAO(connection) {
    this._connection = connection;
}

CustomerDAO.prototype.allCustomer = function (callback) {
    this._connection.query('SELECT * FROM Customer', callback);
}

module.exports = function () {
    return CustomerDAO;
};
