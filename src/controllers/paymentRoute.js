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
      message: {
        type: 'warning',
        value: error.details[0].message
      }
    });
  if (
    req.body.students[0].sendMessage == undefined &&
    req.body.students[0].sendReceipt == undefined
  ) {
    req.body.students[0].sendMessage = '';
    req.body.students[0].sendReceipt = '';
  }
 const data = req.body;
  let students = {
    studentID: data.students[0].studentID,
    studentName: data.students[0].studentName,
    datePayment: data.students[0].datePayment,
    amountPayment: data.students[0].amountPayment,
    formPayment: data.students[0].formPayment,
    obs: data.students[0].obs,
    sendMessage: data.students[0].sendMessage,
    sendReceipt: data.students[0].sendReceipt
  };

  //check if the user payed current month
  const payed = await Payment.findOne({ month: data.month });
  if (payed && payed.students.length > 0) {
    const userPayed = payed.students.filter(
      student => student.studentID == students.studentID
    );
    //find student

    if (userPayed.length > 0) {
      //res.status(204);
      return res.status(204).json({
        error: true,
        message: {
          type: 'warning',
          value: `O aluno ${req.body.students[0].studentName} já realizou o pagamento para o referente mês.`
        }
      });
    }
    //new student pay to current month
    payed.students.push(students);
    const payment = await Payment.updateOne({ _id: payed._id }, payed);

    return res.status(201).json({
      error: null,
      payment: payment._id
    });
  } else {
    //first payment to month
    //create a new Payment
    const payment = new Payment({
      month: data.month,
      students: [students]
    });

    try {
      const savedPayment = await payment.save();
      res.status(201).json({
        error: null,
        payment: payment._id
      });
    } catch (error) {
      res.status(400).json({
        error: true,
        message: { type: 'warning', value: error.errors }
      });
    }
  }
});

//remove payment for one student
router.delete('/remove/:id/:student', async (req, res) => {
  try {
    const payment = await Payment.find({ _id: req.params.id });

    if (payment.length > 0) {
      let students = payment[0].students;
      let indexStudent = students.findIndex(student => student._id == req.params.student)
      let updateStudents = students.splice(indexStudent, 1);
      const newPayment = await Payment.updateOne(
        { _id: req.params.id },
        updateStudents
      );
      if (newPayment) {
        return res.status(200).json({
          error: false,
          message: {
            type: 'success',
            value:
              'O pagamento do aluno foi retirado do banco de dados com sucesso!'
          }
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
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
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
  //console.log(req.params.m)
  try {
    const payment = await Payment.find({ month: req.params.m });

    if (payment.length > 0) {
      return res.status(200).json({
        error: null,
        payment: payment
      });
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
    //   console.log(error, req);
  }
});

//route list alls  -- @get
router.get('/alls', async (req, res) => {
  try {
    const payment = await Payment.find();
    if (payment.length) {
      return res.status(200).json({
        error: null,
        payment: payment
      });
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
  const { error } = paymentRegisterValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: {
        type: 'warning',
        value: error.details[0].message
      }
    });
  if (
    req.body.sendMessage == undefined &&
    req.body.sendReceipt == undefined
  ) {
    req.body.sendMessage = '';
    req.body.sendReceipt = '';
  }
  const data = req.body;
  let students = {
    studentID: data.studentID,
    studentName: data.studentName,
    datePayment: data.datePayment,
    amountPayment: data.amountPayment,
    formPayment: data.formPayment,
    obs: data.obs,
    sendMessage: data.sendMessage,
    sendReceipt: data.sendReceipt
  };
  let updatePayment = {
    month: data.month,
    students: [students]
  }
  try {
    const payment = await Payment.updateOne({ _id: req.params._id }, updatePayment);

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
