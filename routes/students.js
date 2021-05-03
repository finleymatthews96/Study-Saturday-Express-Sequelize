const Student = require('../db/models/student');

const router = require('express').Router();

// GET /students
router.get('/', async (req, res, next) => {
  try {
    const allStudents = await Student.findAll();
    res.json(allStudents);
  } catch (error) {
    next(error);
  }
})

// Get /students/:id
router.get('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const student = await Student.findByPk(id);

    if (student) {
      res.json(student);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    next(error)
  }
})

// POST /students
router.post('/', async (req, res, next) => {
  try {
    const {firstName, lastName, email} = req.body
    const newStudent = await Student.create({
      firstName,
      lastName,
      email
    })
    res.status(201).json(newStudent);
  } catch (error) {
    next(error);
  }
})

// PUT /students/:id
router.put('/:id', async (req, res, next) => {
  try {
    const {firstName, lastName, email} = req.body
    const student = await Student.findByPk(req.params.id);
    student.firstName = firstName;
    student.lastName = lastName;
    student.email = email;

    res.json(student);
  } catch (error) {
    next(error);
  }
})

// DELETE /students/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const student = await Student.findByPk(req.params.id);
    await student.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
