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

async function getAllAssignments() {

  const allUsers = await prisma.assignments.findMany()
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

async function getAssignment(id) {

  console.log(id)
  const allUsers = await prisma.assignments.findUnique({ where: {ID : parseInt(id)} })
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}
async function getAssignmentsByCourse(id) {

  console.log(id)
  const allUsers = await prisma.assignments.findUnique({ where: {Courses_ID : parseInt(id)} })
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

//All gets

router.get('/', async function(req, res, next) {
  try {
    const result = await getAllAssignments();
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
    const result = await getAssignmentsByCourse(req.params.id);
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


module.exports = router;
