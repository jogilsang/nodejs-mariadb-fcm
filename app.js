var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var apisRouter = require('./routes/api');
var fcmRouter = require('./routes/fcm');

// error
var cors = require('cors');

// GET /assets/icon/favicon.ico 404
var favicon = require('serve-favicon')
var path = require('path')

var app = express();

// favicon 설정
app.use(favicon(path.join('./public/images','favicon.ico')));

// CORS 설정
app.use(cors());

app.get('/corstest', function (req, res, next) {
  res.json({msg: 'This is CORS-enabled for all origins!'})
});

//app.listen(80, function () {
//  console.log('CORS-enabled web server listening on port 80')
//});

//app.listen(443, function () {
//  console.log('CORS-enabled web server listening on port 443')
//});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api', apisRouter);
app.use('/fcm', fcmRouter);

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
