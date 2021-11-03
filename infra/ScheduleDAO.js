function ScheduleDAO(connection) {
    this._connection = connection;
}

//create job for customer
ScheduleDAO.prototype.save = function (customer, callback) {
    this._connection.query('INSERT INTO Schedule SET ?', customer, callback);
 }

//update data customer fase 1
ScheduleDAO.prototype.update = function (customer, callback) {
    this._connection.query('UPDATE Schedule SET ? where ScheduleId = ?',
        [customer, customer.ScheduleId], callback);
}

//update data customer fase 2 scheduled walk thru
ScheduleDAO.prototype.updateWalk = function (customer, callback) {
    this._connection.query('UPDATE Schedule SET DateWalk = ?, FollowUpId = ?, JobDescription = ? where ScheduleId = ?',
        [customer.DateWalk, customer.FollowUpId, customer.JobDescription, customer.ScheduleId], callback);
}


//cadastra location para o schedule
ScheduleDAO.prototype.saveLocation = function (teste, teste2, callback) {
    this._connection.query('INSERT INTO Schedule_Location (ScheduleId, LocationId) VALUES (?,?)', [teste, teste2], callback);
}

//ger all project manager backoffice
ScheduleDAO.prototype.getBackoffice = function (callback) {
    this._connection.query('select * from User u inner join User_Group ug on (u.Id = ug.Id) left join PhoneUser pu on (u.Id = pu.User_Id) left join Phone p on (p.Id = pu.Phone_Id) where ug.GroupId = 1',
        callback);
}





//retorna todos os registros de schedules
ScheduleDAO.prototype.getAll = function (callback) {
    this._connection.query('select * from Schedule s where s.Status = 0 order by s.ScheduleId desc',
        callback);
}


//retorna todos os empregados cadastrados para schedule
ScheduleDAO.prototype.getAllTeam = function (callback) {
    this._connection.query('SELECT * FROM User', callback);
}

//retorna todos os empregados cadastrados para schedule
ScheduleDAO.prototype.getAllTeamScheduled = function (callback) {
    this._connection.query('SELECT * FROM User u join UserSchedule us on (u.Id = us.User_Id) where us.Status=0', callback);
}



//retorna schedule pelo id
ScheduleDAO.prototype.getScheduleById = function (id, callback) {
    this._connection.query("select * from UserSchedule where Schedule_ScheduleId = ? and Status = 0", [id], callback);
}

//retorna schedule pela data
ScheduleDAO.prototype.getScheduleByDate = function (DateStart, callback) {
    this._connection.query("select * from Schedule s inner join UserSchedule us on (s.ScheduleId = us.Schedule_ScheduleId) inner join User u on (us.User_Id = u.Id) left join User_PaymentMethod up on (u.Id = up.User_Id) left join PaymentMethod pm on (pm.PaymentMethodId = up.PaymentMethodId) where s.Status = 0 and us.Status = 0 and s.DateStart <= DATE(?) and s.DateEnd >= DATE(?) order by s.ScheduleId desc", [DateStart, DateStart], callback);
}

//retorna todos os schedules selecionado
ScheduleDAO.prototype.getAllSelected = function (callback) {
    this._connection.query("select * from UserSchedule where Status = 0", callback);
}

//cadastra team para o schedule
ScheduleDAO.prototype.saveTeam = function (schedule, callback) {
    this._connection.query('INSERT INTO UserSchedule (Schedule_ScheduleId, User_Id, Status) VALUES (?,?,?)', [schedule.Schedule_ScheduleId, schedule.User_Id, schedule.Status], callback);
}


//cadastra location para o schedule
ScheduleDAO.prototype.saveFollowUp = function (follow, callback) {
    this._connection.query('INSERT INTO Schedule_FollowUp (ScheduleId, FollowUpId) VALUES (?,?)', [follow.ScheduleId, follow.FollowUpId], callback);
}

//delete team para o schedule
ScheduleDAO.prototype.deleteTeam = function (schedule, callback) {
    this._connection.query('UPDATE UserSchedule SET Status = ? where Schedule_ScheduleId = ?',
        [schedule.Status, schedule.ScheduleId], callback);
}

//deleta schedule
ScheduleDAO.prototype.deleteSchedule = function (schedule, callback) {
    this._connection.query('UPDATE Schedule SET Status = ? where ScheduleId = ?',
        [schedule.Status, schedule.ScheduleId], callback);
}

//retorna usuário e senha para login
ScheduleDAO.prototype.loginUser = function (user, callback) {
    this._connection.query('select * from User where Email = ? and Password = ?',
        [user.Email, user.Password], callback);
}

//seleciona todos os status possiveis para schedule
ScheduleDAO.prototype.getFollowUp = function (callback) {
    this._connection.query('select * from FollowUp', callback);
}

//seleciona todos os locais possiveis para schedule
ScheduleDAO.prototype.getLocation = function (callback) {
    this._connection.query('select * from Location', callback);
}

//retorna todos os codigos por id
ScheduleDAO.prototype.getCodById = function (schedule, callback) {
    this._connection.query('select * from Schedule s inner join UserSchedule us on (s.ScheduleId = us.Schedule_ScheduleId) inner join User u on (us.User_Id = u.Id) left join User_PaymentMethod up on (u.Id = up.User_Id) left join PaymentMethod pm on (pm.PaymentMethodId = up.PaymentMethodId) where s.Status = 0 and us.Status = 0 and s.DateStart = DATE(?) order by s.ScheduleId desc',
    [schedule.DateStart], callback);
}

module.exports = function () {
    return ScheduleDAO;
};
