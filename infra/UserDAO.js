function UserDAO(connection) {
    this._connection = connection;
}

UserDAO.prototype.save = function (user, callback) {
    this._connection.query('INSERT INTO User SET ?', user, callback);
}

UserDAO.prototype.saveAddress = function (address, callback) {
    this._connection.query('INSERT INTO Address SET ?', address, callback);
}

UserDAO.prototype.update = function (user, callback) {
    this._connection.query('UPDATE User SET name = ?, email = ?, password = ?, dateUpdated = ? where id = ?',
                              [user.name, user.email, user.password, user.dateUpdated, user.id], callback);
}

UserDAO.prototype.updateAvatar = function (user, callback) {
    this._connection.query('UPDATE User SET AvatarImg = ? where Id = ?',
                              [user.AvatarImg, user.Id], callback);
}

UserDAO.prototype.delete = function (user, callback) {
    this._connection.query('UPDATE User SET enable = ?, dateUpdated = ? where id = ?',
                              [user.enable, user.dateUpdated, user.id], callback);
}

UserDAO.prototype.getById = function (id, callback) {
    this._connection.query("select Name, AvatarImg, Id, Email, Password from User where Id = ?", [id], callback);
}

UserDAO.prototype.getByEmail = function (email, callback) {
    this._connection.query("select Name, AvatarImg, Id, Email from User where Email = ?", [email], callback);
}

UserDAO.prototype.ThemeByUser = function (id, callback) {
    this._connection.query("SELECT c.Id, c.Name AS Name FROM User AS a INNER JOIN IntegrateUserThemes AS b on (a.Id = b.User_Id) INNER JOIN Themes AS C on (b.Themes_Id=c.Id) WHERE b.User_Id = ?", [id], callback);
}

UserDAO.prototype.PublishByUser = function (id, callback) {
    this._connection.query("SELECT * FROM Publications AS a INNER JOIN User AS b on (a.User_Id = b.Id) WHERE a.User_Id = ?", [id], callback);
}

UserDAO.prototype.selectUser = function (user, callback) {

    this._connection.query("SELECT * FROM User WHERE Email = ?", [user.Email], callback);

}

UserDAO.prototype.Login = function (user, callback) {
    this._connection.query("select * from User as u WHERE Email = ? and Password=?", [user.Email, user.Password], callback);

}

UserDAO.prototype.updatePassword = function (user, callback) {
    this._connection.query('UPDATE User SET Password = ? WHERE Id = ?',
                              [user.Password, user.Id], callback);
}

module.exports = function () {
    return UserDAO;
};
