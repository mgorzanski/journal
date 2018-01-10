var mysql = require('mysql');

var pool = mysql.createPool({
    connectionLimit: 100,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'journal',
    debug: false
});

/*pool.prototype.handle_database = function (req, res, callback) {
    this.getConnection(function (err, connection) {
        if (err) {
            res.json({"code": 100, "status": "Error in connecting to database"});
            return;
        }

        console.log('Connected as id ' + connection.threadId);

        callback();

        connection.on('error', function (err) {
            res.json({"code": 100, "status": "Error in connecting to database"});
            return;
        });
    });
}*/

module.exports = pool;