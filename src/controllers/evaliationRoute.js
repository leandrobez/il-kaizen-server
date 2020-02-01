const router = require('express').Router();
const Evaliation = require('../models/Evaliation');
//const { cronogramValidation } = require('../helpers/validation');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to evaliation');

//create
router.post('/create', async (req, res) => {
  //validation
  /*const { error } = cronogramValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.details[0].message
      }
    });*/

  let data = {
    teacherID: req.body.teacher_id,
    teacherName: req.body.teacher_name,
    studentID: req.body.student_id,
    studentName: req.body.student_name,
    data: req.body.data,
    contents: {
      profile: {},
      perimeter: {},
      skinfold: {},
      bones: {},
      summary: {}
    }
  };

  const evaliation = new Evaliation(data);

  try {
    const savedEvaliation = await evaliation.save();
    res.status(201).json({ error: null, evaliation: evaliation._id });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: {
        type: 'warning',
        value: error.errors
      }
    });
  }
});

/**
 * 
 * 
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
 */

module.exports = router;
