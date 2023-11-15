var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mysql = require('mysql')


const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'kursova'
})

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

connection.connect()
  connection.query('SELECT * FROM courses', (err, rows, fields) => {
    console.log('courses: ', rows)

  })


app.options('/', cors())
app.get('/', function(req, res, next) {
 // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
 // res.json({msg: 'This is CORS-enabled for all origins!'})


  connection.query('SELECT * FROM courses', function(err, rows, fields) {
    if (err) {
      console.log('Encountered an error:', err.message);
      return res.send(500, err.message);
    }
    thedata = ({'courses' : rows});
    console.log(thedata);

    res.json({ 
 
    thedata, 
  
  });
  });
});




//app.use('/', indexRouter);
//app.use('/users', usersRouter);

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
