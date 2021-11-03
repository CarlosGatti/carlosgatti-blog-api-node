function SubcontractDAO(connection) {
    this._connection = connection;
}

SubcontractDAO.prototype.save = function (subcontract, callback) {
    this._connection.query('INSERT INTO Subcontract SET ?', subcontract, callback);
}

SubcontractDAO.prototype.allSubcontract = function (callback) {
    this._connection.query('SELECT * FROM Subcontract ORDER BY SubcontractId DESC', callback);
}

SubcontractDAO.prototype.getNameSubcontract = function (subcontract, callback) {
    this._connection.query("SELECT * FROM Subcontract WHERE CompanyName = ?", [subcontract.CompanyName], callback);
}

SubcontractDAO.prototype.saveInsurance = function (insurance, callback) {
    this._connection.query('INSERT INTO InsuranceSubcontract SET ?', insurance, callback);
}

SubcontractDAO.prototype.getSubcontractById = function (id, callback) {
    this._connection.query('SELECT * FROM Subcontract AS s LEFT JOIN InsuranceSubcontract AS i ON s.SubcontractId = i.SubcontractId WHERE s.SubcontractId = ?', id, callback);
}

SubcontractDAO.prototype.update = function (subcontract, callback) {
    this._connection.query('UPDATE User SET name = ?, email = ?, password = ?, dateUpdated = ? where id = ?',
                              [user.name, user.email, user.password, user.dateUpdated, user.id], callback);
}

module.exports = function () {
    return SubcontractDAO;
};
