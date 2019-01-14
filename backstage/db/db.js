const mysql = require('mysql')
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '123456',
  database: 'book_u',
  port: 3306
})

const query = (sql, options, callback) => {
  pool.getConnection((err, connection) => {
    connection.query(sql, options, (error, results, fields) => {
      connection.release()
      if (error) console.log(error)
      callback(err, results, fields)
    })
  })
}

module.exports = query