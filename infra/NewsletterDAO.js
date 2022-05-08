function NewsletterDAO(connection) {
    this._connection = connection;
}

NewsletterDAO.prototype.save = function (newsletter, callback) {
    this._connection.query('INSERT INTO newsletter SET ?', newsletter, callback);
}

NewsletterDAO.prototype.getEmail = function (email, callback) {
    this._connection.query('SELECT * FROM newsletter WHERE Email = ? LIMIT 1', [email], callback);
}

module.exports = function () {
    return NewsletterDAO;
};
