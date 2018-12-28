const express = require('express')
const router = express.Router()

const query = require('../db/db')

function getType(type) {
  if (type == 1) {
    return '玄幻'
  } else if (type == 2) {
    return '修真'
  } else if (type == 3) {
    return '都市'
  } else if (type == 4) {
    return '历史'
  } else if (type == 5) {
    return '网游'
  }
}

router.get('/', (req, res) => {
  const type = getType(req.query.type)
  let begin = Number(req.query.begin)
  let count = Number(req.query.count)
  query(`select * from booklist where type = ? ORDER BY id ASC limit ${begin},${count};`, [type], (err, results, fields) => {
    res.send(results)
  })
})

module.exports = router