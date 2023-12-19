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
async function putStudent(ID, Name, Surname, Groups_ID)
{
  const updateUser = await prisma.students.update({
    where: {
      ID: ID,
    },
    data: {
      Name: Name,
      Surname: Surname,
      Groups_ID: Groups_ID,
    },
  })
}


async function deleteStudent(ID)
{
  const deleteUser = await prisma.students.delete({
    where: {
      ID: ID
    },
  })
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
    const result = await postStudent(parseInt(data.ID), data.Name, data.Surname, parseInt(data.Groups_ID));
    console.log(await getAllStudents());

    res.json(await getAllStudents());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

router.put('/:id', async function(req, res, next) {
  try {
    const data = await req.body
    await putStudent(parseInt(req.params.id), data.Name, data.Surname, parseInt(data.Groups_ID))
    console.log("here --->");
    
    res.json(await getAllStudents());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});

router.delete('/:id', async function(req, res, next) {
  try {
    
    await deleteStudent(parseInt(req.params.id))
    console.log("here --->");
    res.json(await getAllStudents());
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    await prisma.$disconnect();
  }
});


module.exports = router;
