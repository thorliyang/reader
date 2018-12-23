const express = require('express')
const router = express.Router()

const query = require('../db/db')

router.get('/', (req, res) => {
  const id = req.query.id || 0
  query(id ? `select * from booklist where id=${id};` : `select * from booklist ORDER BY id ASC;`, [1], (err, results, fields) => {
    if (err) throw err
    id ? res.send(results[0]) : res.send(results)
  })
})

module.exports = router