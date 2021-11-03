function ProductsDAO(connection) {
    this._connection = connection;
}

ProductsDAO.prototype.getById = function (product_id, callback) {
    this._connection.query('SELECT * FROM Products WHERE ProductId = ?', [product_id], callback);
}

module.exports = function () {
    return ProductsDAO;
};
