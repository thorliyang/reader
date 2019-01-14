var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var config = require('./config');

var app = express();

// 设置superSecret 全局参数
app.set('superSecret', config.jwtsecret);
// 使用 body parser 将post参数及URL参数可以通过 req.body或req.query 拿到请求参数
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 跨域设置
app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Credentials", true)
  res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  res.header("Access-Control-Allow-Credentials", "true")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// 可以将请求信息打印在控制台，便于开发调试
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const jwt = require('jsonwebtoken')

app.use((req, res, next) => {
  if (req.path !== '/user/login' && req.path !== '/user/register') {
    const token = req.body.token || req.query.token || req.headers.token
    jwt.verify(token, config.jwtsecret, (err, decode) => {
      if (err) {
        res.send({ code: 403, message: 'token已过期，请重新登录' })
      } else {
        req.decoded = decode
        next()
      }
    })
  } else {
    next()
  }
})

app.use('/', require('./routes/index'));
app.use('/booklist', require('./routes/booklist'));
app.use('/type', require('./routes/type'));
app.use('/book', require('./routes/book'));
app.use('/titles', require('./routes/titles'));
app.use('/user', require('./routes/user'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
