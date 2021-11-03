function CommentsDAO(connection) {
    this._connection = connection;
}

CommentsDAO.prototype.PostById = function (id, callback) {
    this._connection.query("SELECT Comment FROM Comments WHERE Posts_Id = ?", [id], callback);
}

CommentsDAO.prototype.save = function (comment, callback) {
    this._connection.query('INSERT INTO Comments SET ?', comment, callback);
}

module.exports = function () {
    return CommentsDAO;
};
