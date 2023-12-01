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

async function getAllLecturers() {

  const allUsers = await prisma.lecturers.findMany()
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

async function getLecturer(id) {

  console.log(id)
  const allUsers = await prisma.lecturers.findUnique({ where: {ID : parseInt(id)} })
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

router.get('/', async function(req, res, next) {
  try {
    const result = await getAllLecturers();
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
    const result = await getLecturer(req.params.id);
    console.log("here --->", result);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});



module.exports = router;
