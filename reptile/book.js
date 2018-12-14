const fs = require('fs')
const cheerio = require('cheerio')
const mysql = require('mysql')
const eventproxy = require('eventproxy')
const express = require('express')
const superagent = require('superagent')
require('superagent-charset')(superagent)
const async = require('async')

const app = express()

const dbConfig = require('./db/dbConfig')
const pool = mysql.createPool(dbConfig.mysql)

let id = 0

const urlList = require('./url')
let num = 1
let urlID = num // 第几本书
let url = urlList[urlID - 1]
let table = num //表名
let total = 0 // 总章节数
let chapters = 9999 // 一共爬取多少章节

function trim(str) {
  return str.replace(/(^\s*)(\s*$)/g, '').replace(/&nbsp;/g, '')
}

//将Unicode转汉字
function reconvert(str) {
  str = str.replace(/(&#x)(\w{1,4});/gi, function ($0) {
    return String.fromCharCode(parseInt(escape($0).replace(/(%26%23x)(\w{1,4})(%3B)/g, "$2"), 16));
  });
  return str
}

function fetUrl(url, callback, id) {
  superagent.get(url)
    .charset('gbk')
    .end((err, res) => {
      let $ = cheerio.load(res.text)
      const arr = []
      const content = reconvert($("#content").html())
      const contentArr = content.split('<br><br>')
      contentArr.forEach(elem => {
        const data = trim(elem.toString())
        arr.push(data)
      })
      const obj = {
        id,
        err: 0,
        bookName: $('.footer_cont a').text(),
        title: $('.bookname h1').text(),
        content: arr.join('-').slice(0, 20000) //由于需要保存至mysql中，不支持直接保存数组，所以将数组拼接成字符串，取出时再分割字符串即可,mysql中varchar最大长度，可改为text类型
      }
      console.log(id)
      callback(null, obj)
    })
}

function saveToMysql(results) {
  id = 0
  results.some(result => {
    pool.query(
      `create table book${table} (
        id int(10) NOT NULL AUTO_INCREMENT,
        err int(10) 
      )`
    )
    pool.query('insert into book' + table + 'set ?', result, (err, res) => {
      if (err) throw err
      console.log(`insert ${result.id} success`)
    })
  })
} 

function main(url) {
  superagent.get(url)
    .charset('gbk')
    .end((err, res) => {
      console.log(url)
      var $ = cheerio.load(res.text)
      let urls = []
      total = $('#list dd').length
      console.log(`共${total}章`)
      $('#list dd').each((i, v) => {
        if (i < chapters) {
          urls.push('http://www.zwdu.com' + $(v).find('a').attr('href'))
        }
      })

      async.mapLimit(urls, 5, (url, callback) => {
        id++
        fetUrl(url, callback, id)
      }, (err, results) => {
        saveToMysql(results)
      })
    })
}

app.get('/', (req) => {
  main(url)
})

app.listen('3379')