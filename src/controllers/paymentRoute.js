const router = require('express').Router();
const Payment = require('../models/Payment');

const { paymentRegisterValidation } = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to payments');

//route register payment -- @postif don´t have any payments
router.post('/create', async (req, res) => {
  const { error } = paymentRegisterValidation(req.body);

  if (error)
    return res.status(400).json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  let students = {
    studentID: req.body.students[0].studentID,
    studentName: req.body.students[0].studentName,
    datePayment: req.body.students[0].datePayment,
    amountPayment: req.body.students[0].amountPayment,
    formPayment: req.body.students[0].formPayment,
    obs: req.body.students[0].obs,
    sendMessage: req.body.students[0].sendMessage,
    sendReceipt: req.body.students[0].sendReceipt
  };
  //check if the user payed current month
  const payed = await Payment.findOne({ month: req.body.month });
  if (payed && payed.students.length > 0) {
    const userPayed = payed.students.filter(
      student => student.studentID == req.body.students[0].studentID
    );
    //find student
    if (userPayed.length == 1) {
      //res.status(204);
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: `O aluno ${req.body.students[0].studentName} já realizou o pagamento para o referente mês.`
        }
      });
    }
    //new student pay to current month
    payed.students.push(students);

    res.json({
      error: null,
      payment: payed
    });
  } else {
    //first payment to month
    //create a new Payment
    const payment = new Payment({
      month: req.body.month,
      students: [students]
    });

    try {
      const savedPayment = await payment.save();
      res.status(201).json({ error: null, payment: payment._id });
    } catch (error) {
      res.status(400).json({
        error: true,
        message: { type: 'warning', value: error.errors }
      });
    }
  }
});

//route search payment id -- @get
router.get('/show/:_id', async (req, res) => {
  try {
    const payment = await Payment.find({ _id: req.params._id });
    if (payment.length > 0) {
      return res.status(200).json({ error: null, payment: payment });
    } else {
      return res.status(201).json({
        error: true,
        message: { type: 'warning', value: 'Nenhum resultado para a busca' }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'warning',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
  }
});

//route search payment month -- @get
router.get('/show/month/:m', async (req, res) => {
  try {
    const payment = await Payment.find({ month: req.params.m });
    if (payment.length > 0) {
      res.status(200).json({ error: null, payment: payment });
    } else {
      return res.status(201).json({
        error: true,
        message: { type: 'warning', value: 'Nenhum resultado para a busca' }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'warning',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
    console.log(error, req);
  }
});

//route list alls  -- @get
router.get('/alls', async (req, res) => {
  try {
    const payment = await Payment.find();
    if (payment.length > 0) {
      return res.status(200).json({ error: null, payment: payment });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nenhum pagamento registrado'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'warning',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
    console.log(error, req);
  }
});

//route update --@put
router.put('/update/:_id', async (req, res) => {
  const data = req.body;
  try {
    const payment = await Payment.updateOne({ _id: req.params._id }, data);

    if (payment) {
      return res.status(200).json({
        error: false,
        message: { type: 'success', value: 'Atualização feita com sucesso!' }
      });
    } else {
      return res.status(404).json({
        error: true,

        message: {
          type: 'warning',
          value: 'Não foi possível fazer a atualização com esse ID'
        }
      });
    }
  } catch (error) {
    req
      .status(404)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

router.put('/update/pay/:id', async (req, res) => {
  const data = req.body;
  //console.log(data)
  try {
    const payment = await Payment.updateOne(
      { _id: req.params.id },
      {
        $set: {
          students: data
        }
      }
    );
    if (payment) {
      return res.status(200).json({
        error: false,
        message: { type: 'success', value: 'Atualização feita com sucesso!' }
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi possível fazer a atualização com esse ID'
        }
      });
    }
  } catch (error) {
    req
      .status(404)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

module.exports = router;
