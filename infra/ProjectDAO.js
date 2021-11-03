function ProjectDAO(connection) {
    this._connection = connection;
}

ProjectDAO.prototype.getProjectCategory = function (callback) {
    this._connection.query('SELECT * FROM CategoryProject', callback);
}

module.exports = function () {
    return ProjectDAO;
};
