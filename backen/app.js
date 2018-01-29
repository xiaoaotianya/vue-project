var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors')
mongoose.connect('mongodb://localhost/blog');
mongoose.Promise = global.Promise;


/*
models:数据模型
controllers:控制器层
routes:路由
*/

var index = require('./routes/index');
var users = require('./routes/users');
var news = require('./routes/news');
var cate = require('./routes/cate');
<<<<<<< HEAD

=======
var comment = require('./routes/comment');
var upload=require('./routes/upload');
>>>>>>> c4bb82c1fb3b9a0cd993bdd97a6826f863ebf030
var app = express();
app.use(cors())


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/upload',upload)
app.use('/', index);
app.use('/users', users);
app.use('/news', news);
app.use('/cate', cate);

// catch 404 and forward to error handler3
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
