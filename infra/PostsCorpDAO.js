function PostsCorpDAO(connection) {
    this._connection = connection;
}

PostsCorpDAO.prototype.AllPostsCorp = function (callback) {
    this._connection.query("SELECT a.Id, a.SmallTitle, a.BigTitle, a.HeaderImg" + 
    " FROM postscorp ORDER BY a.Id DESC LIMIT 10", callback);
}

PostsCorpDAO.prototype.AllSlugsCorp = function (callback) {
    this._connection.query("SELECT Id FROM postscorp", callback);
}

PostsCorpDAO.prototype.PostByIdCorp = function (id, callback) {
    this._connection.query("SELECT a.Id, a.SmallTitle, a.BigTitle, a.HeaderImg, a.Introduction, a.Description, a.Date" + 
    " FROM postscorp a WHERE a.Id = ?", [id], callback);
}

PostsCorpDAO.prototype.PostByIdGallery = function (id, callback) {
    this._connection.query("SELECT a.ImgAddress" + 
    " FROM gallerycorp a WHERE a.IdPost = ? ORDER BY a.Id ASC LIMIT 4", [id], callback);
}


module.exports = function () {
    return PostsCorpDAO;
};
