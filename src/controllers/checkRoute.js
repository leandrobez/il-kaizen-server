const router = require('express').Router();
const Check = require('../models/Check');

//const { paymentRegisterValidation } = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to checks');

//route create chec

router.post('/create', async (req, res) => {
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
    res.status(201).json(
      { error: null, 
        check: check._id 
      });
  } catch (error) {
    res.status(400).send({
      error: true,
      message: {
        type: 'warning',
        value: error.errors
      }
    });
  }
});

module.exports = router;
