function ExpenseDAO(connection) {
    this._connection = connection;
}

ExpenseDAO.prototype.typeExpense = function (callback) {
    this._connection.query('SELECT * FROM Expense', callback);
}

module.exports = function () {
    return ExpenseDAO;
};
