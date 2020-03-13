const router = require('express').Router();
const Register = require('../models/Register');

//validations
const { userRegisterValidation } = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to register');

//register
router.post('/create', async (req, res) => {
  let registration = {
    studentID: req.body.studentID,
    teacher: req.body.teacher,
    schedule: req.body.schedule
  };

  //validation persoanl register
  const { error } = userRegisterValidation(registration);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  //if all is ok create new Register
  let newRegister = {
    studentID: registration.studentID,
    teacher: registration.teacher,
    schedule: registration.schedule
  };

  const register = new Register(newRegister);

  try {
    const savedRegister = await register.save();
    res.status(201).json({ 
      error: null,
      register: register._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//get All register
router.get('/alls', async (req, res) => {
  try {
    const register = await Register.find().sort({ name: 1 });
    if (register.length > 0) {
      return res.status(200).json({ error: null, register: register });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nehuma matrícula no Banco de Dados.'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'danger',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
  }
});
/*
//remove student
router.delete('/remove/:_id', async (req, res) => {
  try {
    const student = await Student.deleteOne({ _id: req.params._id });
    if (student) {
      return res.status(200).json({
        error: false,
        message: {
          type: 'success',
          value: 'O aluno foi retirado do banco de dados com sucesso!'
        }
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi possível retirar o aluno do banco de dados!'
        }
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//search student
router.get('/show/:_id', async (req, res) => {
  try {
    const student = await Student.findById({ _id: req.params._id });
    if (student) {
      return res.status(200).json({ error: null, student: student });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi encontrado aluno com o presente ID'
        }
      });
    }
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//update student
router.put('/update/:_id', async (req, res) => {
  const data = req.body;
  try {
    const student = await Student.updateOne({ _id: req.params._id }, data);
    if (student) {
      return res.status(200).json({
        error: false,
        message: { type: 'success', value: 'Atualização feita com sucesso!' }
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi possível atualizar o aluno com o presente ID'
        }
      });
    }
  } catch (error) {
    return req
      .status(404)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});
*/

module.exports = router;
