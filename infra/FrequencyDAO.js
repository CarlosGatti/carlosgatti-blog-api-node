function FrequencyDAO(connection) {
    this._connection = connection;
}

//Chart Total Hours Worked Per Month
FrequencyDAO.prototype.getHoursMonth = function (callback) {
    this._connection.query('SELECT DATE_FORMAT(fe.Start, "%Y-%m") AS MONTH, SUM(fe.TimeDiff) AS TOTALHOURS FROM FrequencyEvents fe INNER JOIN User us on fe.User_Id = us.Id GROUP BY 1',
        callback);
}





FrequencyDAO.prototype.getFrequencyEvents = function (callback) {
    this._connection.query('SELECT * FROM FrequencyEvents fe INNER JOIN User us ON fe.User_Id = us.Id ORDER BY fe.FrequencyEventsId DESC LIMIT 30',
        callback);
}


module.exports = function () {
    return FrequencyDAO;
};
