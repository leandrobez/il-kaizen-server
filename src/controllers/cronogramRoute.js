const router = require('express').Router();
const Cronogram = require('../models/Cronogram');
const { cronogramValidation } = require('../helpers/validation');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to cronograms');

//create
router.post('/create', async (req, res) => {
  //validation
  const { error } = cronogramValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.details[0].message
      }
    });

  let events = [
    {
      students: req.body.contents[0].schedule[0].events[0].students,
      details: {
        timeKey: req.body.contents[0].schedule[0].events[0].details.timeKey,
        start: req.body.contents[0].schedule[0].events[0].details.start,
        end: req.body.contents[0].schedule[0].events[0].details.end,
        class: req.body.contents[0].schedule[0].events[0].details.class
      }
    }
  ];
  let schedule = [
    {
      day: req.body.contents[0].schedule[0].day,
      events: events
    }
  ];
  let contents = [
    {
      month: req.body.contents[0].month,
      schedule: schedule
    }
  ];
  let newCronogram = {
    teacher: req.body.teacher,
    contents: contents
  };

  const cronogram = new Cronogram(newCronogram);

  try {
    const savedCronogram = await cronogram.save();
    res.status(201).json({ error: null, cronogram: cronogram._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//search
router.get('/show/:_id', async (req, res) => {
  try {
    const cronogram = await Cronogram.findById({ _id: req.params._id });
    if (cronogram.length > 0) {
      return res.status(200).json({
        error: null,
        cronogram: cronogram
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi encontrado cronogram com o presente ID'
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.errors
      }
    });
  }
});

//get all cronograms
router.get('/alls', async (req, res) => {
  try {
    const cronogram = await Cronogram.find();
    if (cronogram.length > 0) {
      return res.status(200).json({
        error: null,
        cronogram: cronogram
      });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nehum cronograma cadastrado no Banco de Dados.'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'danger',
        value: error.errors
      }
    });
  }
});

//update
router.put('/update/:_id', async (req, res) => {});

//remove
router.delete('/remove/:_id', async (req, res) => {});

//get teacherCronogram
router.get('/cronogram/teacher/:teacher', async (req, res) => {
  const teacher = req.params.teacher;
  try {
    const cronogram = await Cronogram.find({ teacher: teacher });
    if (cronogram.length > 0) {
      return res.status(200).json({
        error: null,
        cronogram: cronogram
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nehum cronograma cadastrado para esse professor.'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'danger',
        value: error.errors
      }
    });
  }
});

module.exports = router;
