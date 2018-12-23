const cheerio = require('cheerio')
const mysql = require('mysql')
const express = require('express')
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async')
const saveToMysql = require('./method/saveToMysql')

const app = express()

const dbConfig = require('./db/dbConfig')
const pool = mysql.createPool(dbConfig.mysql)

let id = 0

// 总共爬多少本
const urlList = require('./url')
// .slice(0, 10)S

function fetList(url, callback, id) {
  superagent.get(url)
    .charset('gbk')
    .buffer(true)
    .end((err, res) => {
      const $ = cheerio.load(res.text)
      let content = []
      $("#list dd").each((i, v) => {
        content.push($(v).find('a').text())
      })
      let obj = {
        id,
        name: $("#info h1").text(),
        titles: content.join('-')
      }
      console.log(id)
      callback(null, obj)
    })
}

app.get('/', (req, res) => {
  async.mapLimit(urlList, 100, (url, callback) => {
    id++
    fetList(url, callback, id)
  }, (err, results) => {
    res.send(results)
    saveToMysql(results, pool, 'insert into booktitles set ?')
  })
})

app.listen('3379')