function PostsDAO(connection) {
    this._connection = connection;
}

PostsDAO.prototype.LatestPosts = function (callback) {
    this._connection.query("SELECT a.Id, a.Title, CONCAT(LEFT(a.Text,120),'...') AS Text, a.DateUpdated AS Date, b.Title as Theme, c.Title as Category, u.Email "+
    "FROM Posts a INNER JOIN Themes b ON (a.Themes_Id=b.Id)" + 
    "INNER JOIN User u ON (a.UserId=u.Id)" + 
    "INNER JOIN Knowledge c ON (c.Id=b.Knowledge_Id)" + 
    "INNER JOIN Pillars d ON (d.Id=c.Pillars_Id) ORDER BY a.Id DESC LIMIT 3", callback);
}

PostsDAO.prototype.AllPosts = function (callback) {
    this._connection.query("SELECT a.Id, a.Title, a.Text, a.DateUpdated AS Date, a.Img, b.Title as Theme, c.Title as Category, u.Email "+
    "FROM Posts a INNER JOIN Themes b ON (a.Themes_Id=b.Id)" + 
    "INNER JOIN User u ON (a.UserId=u.Id)" + 
    "INNER JOIN Knowledge c ON (c.Id=b.Knowledge_Id)" + 
    "INNER JOIN Pillars d ON (d.Id=c.Pillars_Id) ORDER BY a.Id DESC", callback);
}

PostsDAO.prototype.PostById = function (id, callback) {
    this._connection.query("SELECT a.Id, a.Title, a.Text, a.DateUpdated AS Date, a.Img, b.Title as Theme, c.Title as Category, u.Email "+
    "FROM Posts a INNER JOIN Themes b ON (a.Themes_Id=b.Id)" + 
    "INNER JOIN User u ON (a.UserId=u.Id)" + 
    "INNER JOIN Knowledge c ON (c.Id=b.Knowledge_Id)" + 
    "INNER JOIN Pillars d ON (d.Id=c.Pillars_Id)" +
    "WHERE a.Id = ?", [id], callback);
}

PostsDAO.prototype.AllSlugs = function (callback) {
    this._connection.query("SELECT Id FROM Posts", callback);
}



PostsDAO.prototype.save = function (publish, callback) {
    this._connection.query('INSERT INTO Posts SET ?', publish, callback);
}

PostsDAO.prototype.KnowledgeById = function (id, callback) {
    this._connection.query("select * from Posts a inner join Themes b on (a.Themes_Id = b.Id) inner join Knowledge c on (b.Knowledge_Id = c.Id) where c.Id = ?", [id], callback);
}

PostsDAO.prototype.LatestNewsHome = function (callback) {
    this._connection.query("select a.Id, a.Title, CONCAT(LEFT(a.Text,120),'...') AS Text, a.DateUpdated, b.Name, b.Icon from Posts a inner join Themes b on (a.Themes_Id = b.Id) Limit 4", callback);
}

PostsDAO.prototype.LastPosts = function (callback) {
    this._connection.query("select * from Posts Limit 6", callback);
}



module.exports = function () {
    return PostsDAO;
};
