function TitleDAO(connection) {
    this._connection = connection;
}

TitleDAO.prototype.save = function (title, callback) {

    this._connection.query('INSERT INTO Title SET JobTitle = ?', 
                        [title.job_title], callback);
}

TitleDAO.prototype.update = function (title, callback) {
    this._connection.query('UPDATE Title SET JobTitle = ? where TitleId = ?',
                              [title.job_title,title.id], callback);
}

TitleDAO.prototype.delete = function (title, callback) {
    this._connection.query('UPDATE Title SET JobTitle = ? where TitleId = ?',
                              [title.JobTitle], callback);
}

TitleDAO.prototype.getById = function (id, callback) {
    this._connection.query("select * from Title where TitleId = ?", [id], callback);
}

TitleDAO.prototype.getAllTitle = function (callback) {
    this._connection.query("select * from Title order by TitleId desc", callback);
}

module.exports = function () {
    return TitleDAO;
};
