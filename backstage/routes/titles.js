const express = require('express')
const router = express.Router()

const query = require('../db/db')

router.get('/', (req, res) => {
  const id = req.query.id

  query(`select * from booktitles where id=${id};`, [1], (err, results, fields) => {
    if (err) throw err
    res.send(results[0])
  })
})

module.exports = router