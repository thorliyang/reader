const cheerio = require('cheerio')
const mysql = require('mysql')
const express = require('express')
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async')
const saveToMysql = require('./method/saveToMysql')

const urls = require('./url').slice(0, 10)

const app = express()

const dbConfig = require('./db/dbConfig')
const pool = mysql.createPool(dbConfig.mysql)

let id = 0

function bookType(str) {
  if (str.indexOf('连载') !== -1) return '连载'
  if (str.indexOf('完结') !== -1) return '完本'
}

function fetList(url, callback, id) {
  superagent.get(url)
    .charset('gbk')
    .end(function(err, res) {
      const $ = cheerio.load(res.text)
      let author = $('#info p').first().text().substr($('#info p').first().text().indexOf('：') + 1)
      let like = []
      for (var i = 0; i < 3; i ++) {
        like.push(Math.round(Math.random() * (150 - 1) + 1))
      }
      let intro = ''
      $("#intro p").each((i, v) => {
        intro += '-' + $(v).text().trim()
      })
      var obj = {
        id: id,
        name: $('#info h1').text(),
        author,
        images: $("#fmimg img").attr('src'),
        ratings: parseFloat(Math.random() * 2 + 3).toFixed(1),
        wordcount: (Math.random() * 200 + 100).toFixed(2),
        type: $('.con_top a').eq(1).text().substr(0, 2),  
        intro: $('#intro p').first().text().trim(), 
        serialize: bookType($('#info p').eq(1).text()), 
        like: like.join('-')
      }
      console.log(id)
      callback(null, obj)
    })
}

app.get('/', function(req, res, next) {
  async.mapLimit(urls, 5, function (url, callback) {
    id ++
    fetList(url, callback, id)
  }, function (err, results) {
    res.send(results)
    // saveToMysql(results, pool,'insert into booklist set ?')
  })
})

app.listen('3379')