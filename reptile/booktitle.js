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