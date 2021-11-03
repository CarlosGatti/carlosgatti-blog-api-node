function SignalsDAO(connection) {
    this._connection = connection;
}

SignalsDAO.prototype.Signals = function (callback) {
    today=new Date();
    y=today.getFullYear();
    m=today.getMonth() + 1;
    d=today.getDate();

    this._connection.query("select * from Signals where Year = ? and Month = ? and Day = ?",[y, m, d], callback);
}

SignalsDAO.prototype.TotalSignals = function (callback) {
    today=new Date();
    y=today.getFullYear();
    m=today.getMonth() + 1;
    d=today.getDate();

    this._connection.query("select Timeframe, Count(SignalId) as Total from Signals where Year = ? and Month = ? and Day = ? Group By 1",[y, m, d], callback);
}

module.exports = function () {
    return SignalsDAO;
};
