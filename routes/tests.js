const Test = require('../db/models/test');
const router = require('express').Router();

// GET /tests
router.get('/', async (req, res, next) => {
  try {
    const allTests = await Test.findAll();
    res.json(allTests);
  } catch (error) {
    next(error)
  }
})

// 'GET /tests/:id'
router.get('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    res.json(test);
  } catch (error) {
    next(error)
  }
})

// POST /tests/student/:studentId' - not working
router.post('student/:studentId', async (req, res, next) => {
  try {
    const { studentId } = req.params
    console.log('studentId ------>', studentId)
    const { subject, grade } = req.body
    console.log('subject ------>', subject)
    console.log('grade ------>', grade)
    const newTest = await Test.create({
      subject,
      grade,
      studentId
    })
    res.status(201).json(newTest);
  } catch (error) {
    next(error);
  }
})

// DELETE /tests/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const test = await Test.findByPk(req.params.id);
    await test.destroy();
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
