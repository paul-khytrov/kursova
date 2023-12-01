var express = require('express');
var router = express.Router();
var createError = require('http-errors');
var path = require('path');
var cors = require('cors')
var mysql = require('mysql')

const { PrismaClient } = require('@prisma/client')


const prisma = new PrismaClient()

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'root',
//   database: 'kursova'
// })

async function getAllStudents() {

  const allUsers = await prisma.students.findMany()
  console.log("here ->" + allUsers)
  // const res_json = JSON.stringify(allUsers)
  // console.log("here -->" + res_json)
  return allUsers
}

async function getStudent(id) {

  console.log(id)
  const allUsers = await prisma.students.findUnique({ where: {ID : parseInt(id)} })
  console.log("here ->" + allUsers)
  //const res_json = JSON.stringify(allUsers)
  //console.log("here -->" + res_json)
  return allUsers
}

async function postStudent(ID, Name, Surname, Groups_ID) {

  console.log(ID)
  const allUsers = await prisma.students.create({ data: {
    ID: ID,
    Name: Name,
    Surname: Surname,
    Groups_ID: Groups_ID

  } })

  return 0
}


router.options('/', cors())


router.get('/', async function(req, res, next) {
  try {
    const result = await getAllStudents();
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
    const result = await getStudent(req.params.id);
    console.log("here --->", result);
    res.json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

router.post('/', async function(req, res, next) {
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin');
  res.header('Access-Control-Allow-Origin', '*');
  const data = await req.body
  // const result = await postStudent();
  console.log("here is data we received ->", data);
  try {
    const data = await req.body
    const result = await postStudent(data.ID, data.Name, data.Surname, data.Groups_ID);
    console.log(await getAllStudents());

    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});


module.exports = router;
