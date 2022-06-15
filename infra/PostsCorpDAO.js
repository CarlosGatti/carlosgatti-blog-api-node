function PostsCorpDAO(connection) {
    this._connection = connection;
}

PostsCorpDAO.prototype.AllPostsCorp = function (callback) {
    this._connection.query("SELECT a.Id, a.SmallTitle, a.BigTitle, a.HeaderImg" + 
    " FROM servicecorp ORDER BY a.Id DESC LIMIT 10", callback);
}

PostsCorpDAO.prototype.LastPostsCorpFooter = function (callback) {
    this._connection.query("SELECT a.Id, a.SmallTitle, a.BigTitle, a.HeaderImg" + 
    " FROM servicecorp a ORDER BY a.Id DESC LIMIT 2", callback);
}

PostsCorpDAO.prototype.AllSlugsCorp = function (callback) {
    this._connection.query("SELECT Id FROM servicecorp", callback);
}

PostsCorpDAO.prototype.SlugsBlogDetail = function (callback) {
    this._connection.query("SELECT Id FROM blogpostproject", callback);
}


PostsCorpDAO.prototype.PostByIdCorp = function (id, callback) {
    this._connection.query("SELECT a.Id, a.SmallTitle, a.BigTitle, a.HeaderImg, a.Introduction, a.Description, a.Date" + 
    " FROM servicecorp a WHERE a.Id = ?", [id], callback);
}

PostsCorpDAO.prototype.PostByIdGallery = function (id, callback) {
    this._connection.query("SELECT a.ImgAddress" + 
    " FROM gallerycorp a WHERE a.IdPost = ? ORDER BY a.Id ASC LIMIT 4", [id], callback);
}


PostsCorpDAO.prototype.BlogPostProject = function(callback){
    this._connection.query("SELECT a.Id, a.Title, a.Image, a.Tags" + 
    " FROM blogpostproject a ORDER BY a.Id DESC LIMIT 10", callback);
}


PostsCorpDAO.prototype.BlogPostDetailId = function (id, callback) {
    this._connection.query("SELECT a.Id, a.Image, a.Title, b.Title, b.Description, b.Detail, b.Img1, b.Img2 FROM blogpostproject a INNER JOIN blogpostdetail b ON a.Id = b.blogpostproject_Id " + 
    "WHERE a.Id = ?", [id], callback);
}


module.exports = function () {
    return PostsCorpDAO;
};
