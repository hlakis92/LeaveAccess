let express = require('express');
let session = require('express-session');
let compression = require('compression');
let path = require('path');
let favicon = require('serve-favicon');
let logger = require('morgan');
let cookieParser = require('cookie-parser');
let bodyParser = require('body-parser');
let fs = require('fs');
// let UglifyJS = require("uglify-js");
// let zlib = require('zlib');
let config = require('./config.json');
// let RateLimit = require('express-rate-limit');

let indexRouter = require('./routes/index');
// let usersRouter = require('./routes/users');

let app = express();

app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'Th!sI$Le@ve',
  cookie: {
    maxAge: 864000
  },
  resave: true,
  saveUninitialized: true
}));



// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({
  limit: '10mb',
  extended: true
}));
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, api-key, udid, device-type,  Accept");
  next();
});

app.use('/', indexRouter);
// API related routes
require('./server/routes')(app);
var routes = require('./routes/index');
app.use('/', routes);

// app.use(express.static(path.join(__dirname, 'public')));
// app.use('/users', usersRouter);

// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

process.on('unhandledRejection', up => { throw up });

module.exports = app;
