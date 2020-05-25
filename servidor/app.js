var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
const passport = require('passport')
require('./handlers/passportStrategy')

const session = require('express-session')
const flash = require('connect-flash')

var homeRouter = require('./routes/home');
var usuarioRouter = require('./routes/usuario');
var productoRouter = require("./routes/producto");
var comercioRouter = require("./routes/comercio");
var restauracionRouter = require("./routes/restauracion");
var diarioRouter = require("./routes/diario");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads',express.static('uploads'))

app.use(passport.initialize())

app.use('/home', homeRouter);
app.use('/usuario', usuarioRouter);
app.use('/producto', productoRouter);
app.use('/comercio', comercioRouter);
app.use('/restauracion', restauracionRouter);
app.use('/diario', diarioRouter);

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
