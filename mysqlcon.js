const mysql = require('mysql2');

class Database {

  getConnection() {
    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      database: 'universidad'
    });
    return connection;
  }

}
module.exports = Database;


