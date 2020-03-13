const router = require('express').Router();
const Check = require('../models/Check');
const { checkValidation } = require('../helpers/validation');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to checks');

//route create checks
router.post('/create', async (req, res) => {
  const { error } = checkValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.details[0].message
      }
    });

  let checks = {
    studentID: req.body.studentID,
    paymentID: req.body.paymentID,
    bank: req.body.bank,
    numberCheck: req.body.numberCheck,
    amountCheck: req.body.amountCheck,
    targetCheck: req.body.targetCheck
  };
  //create a new Check
  const check = new Check(checks);
  try {
    const savedCheck = await check.save();
   return res.status(201).json(
      { error: null, 
        check: check._id 
      });
  } catch (error) {
    return res.status(400).send({
      error: true,
      message: {
        type: 'warning',
        value: error.errors
      }
    });
  }
});

//show for check
router.get('/show/:id', async (req,res) => {
  try{
    const check = await Check.findById({_id: req.params.id })
    if(check) {
      return res.status(200).json({
        error: null,
        check: check
      })
    } else {
      return res.status(400).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi encontrado o cheque com esse Id informado.'
        }
      })
    }
  }catch (error) {
    return res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.errors
      }
    })
  }
})

//show all checks
router.get('/alls', async (req,res) => {
  try{
    const checks = await Check.find()
    if(checks.length) {
      return res.status(200).json({
        error:null,
        checks: checks
      })
    } else {
      return res.status(400).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Nenhum cheque cadastrado'
        }
      })
    }
  }catch (error) {
    return res.status(400).json({
      error: true,
      message: {
        type: 'warning',
        value: error.errors
      }
    });
  }
})

module.exports = router;
