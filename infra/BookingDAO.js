function BookingDAO(connection) {
    this._connection = connection;
}

BookingDAO.prototype.save = function (booking, callback) {
    this._connection.query('INSERT INTO Booking SET ?', booking, callback);
}

BookingDAO.prototype.getEmail = function (email, callback) {
    this._connection.query('SELECT * FROM Booking WHERE Email = ? LIMIT 1', [email], callback);
}

module.exports = function () {
    return BookingDAO;
};
