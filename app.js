var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors')
var mysql = require('mysql')


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

var studentsRouter = require('./routes/students');
var lecturersRouter = require('./routes/lecturers');
var groupsRouter = require('./routes/groups');
var marksRouter = require('./routes/marks');
var coursesRouter = require('./routes/courses');
var assignmentsRouter = require('./routes/assignments');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// connection.connect()
//   connection.query('SELECT * FROM courses', (err, rows, fields) => {
//     console.log('courses: ', rows)

//   })
async function main() {

  const allUsers = await prisma.students.findMany()
  console.log("here ->" + allUsers)
  const res_json = JSON.stringify(allUsers)
  console.log("here -->" + res_json)
  return res_json
}

app.use('/students', studentsRouter);
app.use('/lecturers', lecturersRouter);
app.use('/groups', groupsRouter);
app.use('/marks', marksRouter);
app.use('/assignments', assignmentsRouter);
app.use('/courses', coursesRouter)

app.options('/', cors())
app.get('/', async function(req, res, next) {
  // try {
  //   const result = await main();
  //   console.log("here --->", result);
  //   res.json({ result });
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({ error: 'Internal Server Error' });
  // } finally {
  //   await prisma.$disconnect();
  // }
  res.send("It works!")

});





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
