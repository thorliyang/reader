const express = require('express')
const router = express.Router()

const jwt = require('jsonwebtoken') // 使用jwt签名


// md5加密密码
const crypto = require('crypto')

function cryptPwd(password) {
  const md5 = crypto.createHash('md5')
  return md5.update(password).digest('hex')
}

const query = require('../db/db')

// 注册
router.get('/register', (req, res, next) => {
  let username = req.query.username
  let password = cryptPwd(req.query.password)

  query('SELECT * FROM user WHERE userName = ?', [username], (err, results) => {
    if (err) {
      res.send({ code: 0, message: '注册失败' })
      return false
    }
    if (results.length !== 0) {
      res.send({ code: 1, message: '用户名存在' })
      return false
    }
    query('INSERT INTO user(userName, passWord) VALUES(?,?)', [username, password], (error, result) => {
      if (error) {
        res.send({ code: 0, message: '注册失败' })
        return false
      }
      res.send({ code: 200, message: '注册成功' })
    })
  })
})

// 登录
router.post('/login', (req, res, next) => {
  let username = req.body.username
  let password = cryptPwd(req.body.password)

  if (!username || !password) {
    res.send({ code: 1, message: '用户名或密码不能为空'})
    return
  }

  query('SELECT * FROM user WHERE userName = ?', [username], (err, results) => {
    if (!results) {
      res.send({ code: -1, message: '用户名不存在' })
    } else {
      if (results[0].passWord !== password) {
        res.send({ code: 2, message: '密码错误' })
      } else {
        var token = jwt.sign({username: username}, req.app.get('superSecret'), {
          expiresIn: 60 * 60 * 24// 授权时效24小时
        });
        res.send({ code: 200, message: '登录成功', token })
      }
    }
  })
})

module.exports = router