function CommentsDAO(connection) {
    this._connection = connection;
}

CommentsDAO.prototype.save = function (contact, callback) {
    this._connection.query('INSERT INTO contactform SET ?', contact, callback);
}

module.exports = function () {
    return CommentsDAO;
};
