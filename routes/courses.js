var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cors = require('cors')
var mysql = require('mysql')

const { PrismaClient } = require('@prisma/client')

router.use(cors());

const prisma = new PrismaClient()

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'kursova'
// })

async function getAllCourses() {

  const allUsers = await prisma.courses.findMany()
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

async function getCourse(id) {

  console.log(id)
  const allUsers = await prisma.courses.findUnique({ where: {ID : parseInt(id)} })
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}
async function getCoursesByStudent(id) {

  console.log(id)
  const stud = await prisma.students.findUnique({ where: {ID : parseInt(id)} });
  console.log()
  const allUsers = await prisma.groups_has_courses.findMany({ where: 
    {
      Groups_ID : parseInt(stud.Groups_ID)
    },
     include: {courses: true}})


  const courseid = allUsers.Courses_ID
  console.log("here ->" + courseid)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}
async function postCourse(Name) {
  const allUsers = await prisma.courses.create({ data: {
    Name: Name,

  } })

  return 0
}

//All gets

router.get('/', async function(req, res, next) {
  try {
    const result = await getAllCourses();
    console.log("here --->", result);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

router.get('/:id', async function(req, res, next) {
  try {
    const result = await getCoursesByStudent(req.params.id);
    console.log("here --->", result);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

//POST

router.post('/', async function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin');
  res.header('Access-Control-Allow-Origin', '*');
  const data = await req.body
  // const result = await postStudent();
  console.log("here is data we received ->", data);
  try {
    const data = await req.body
    const result = await postCourse(data.Name);
    console.log(await getAllCourses());
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

module.exports = router;
