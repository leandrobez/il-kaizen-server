const router = require('express').Router();
const Teacher = require('../models/Teacher');

//validations
const {
  teacherRegisterValidation,
  isValidCPF
} = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to teachers');
//register multiple students
router.post('/create/multiple', async (req, res) => {
  let addressRegister = {
    cep: req.body.address.cep,
    rua_av: req.body.address.rua_av,
    nr: req.body.address.nr,
    complemento: req.body.address.complemento,
    suburb: req.body.address.suburb,
    city: req.body.address.city,
    UF: req.body.address.UF,
    fone: req.body.address.fone,
    clr: req.body.address.clr
  };
  let teacherRegister = {
    name: req.body.name,
    cpf: req.body.cpf,
    cr: req.body.cr,
    picture: req.body.picture,
    ativo: req.body.ativo,
    email: req.body.email,
    dnasc: req.body.dnasc,
    address: addressRegister
  };

  //validation persoanl register
  const { error } = teacherRegisterValidation(teacherRegister);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  //check if cpf is ok
  const cpfOK = isValidCPF(teacherRegister.cpf);
  if (!cpfOK)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'CPF não válido. Por favor verique a informação postada!'
      }
    });
  if (teacherRegister.cpf !== '00000000000') {
    //check if cpf is unique
    const cpfExist = await Teacher.findOne({ cpf: teacherRegister.cpf });
    if (cpfExist)
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value:
            'Esse CPF já está cadastrado. Por favor verique a informação postada!'
        }
      });
  }
  //check if the user is already in the database
  const emailExist = await Teacher.findOne({ email: teacherRegister.email });
  if (emailExist)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Email already exists'
      }
    });

  //if all is ok create new Teacher
  let newTeacher = {
    name: teacherRegister.name,
    cpf: teacherRegister.cpf,
    cr: teacherRegister.cr,
    picture: teacherRegister.picture,
    ativo: teacherRegister.ativo,
    email: teacherRegister.email,
    dnasc: teacherRegister.dnasc,
    address: {
      cep: addressRegister.cep,
      rua_av: addressRegister.rua_av,
      nr: addressRegister.nr,
      complemento: addressRegister.complemento,
      suburb: addressRegister.suburb,
      city: addressRegister.city,
      UF: addressRegister.UF,
      fone: addressRegister.fone,
      clr: addressRegister.clr
    }
  };

  const teacher = new Teacher(newTeacher);

  try {
    const savedTeacher = await teacher.save();
    res.status(201).json({ teacher: teacher._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//register teacher
router.post('/create', async (req, res) => {
  let addressRegister = {
    cep: req.body.address.cep,
    rua_av: req.body.address.rua_av,
    nr: req.body.address.nr,
    complemento: req.body.address.complemento,
    suburb: req.body.address.suburb,
    city: req.body.address.city,
    UF: req.body.address.UF,
    fone: req.body.address.fone,
    clr: req.body.address.clr
  };
  let teacherRegister = {
    name: req.body.name,
    cpf: req.body.cpf,
    cr: req.body.cr,
    picture: req.body.picture,
    ativo: req.body.ativo,
    email: req.body.email,
    dnasc: req.body.dnasc,
    address: addressRegister
  };

  //validation persoanl register
  const { error } = teacherRegisterValidation(teacherRegister);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  //check if cpf is ok
  const cpfOK = isValidCPF(teacherRegister.cpf);
  if (!cpfOK)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'CPF não válido. Por favor verique a informação postada!'
      }
    });
  if (teacherRegister.cpf !== '00000000000') {
    //check if cpf is unique
    const cpfExist = await Teacher.findOne({ cpf: teacherRegister.cpf });
    if (cpfExist)
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value:
            'Esse CPF já está cadastrado. Por favor verique a informação postada!'
        }
      });
  }
  //check if the user is already in the database
  const emailExist = await Teacher.findOne({ email: teacherRegister.email });
  if (emailExist)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Email already exists'
      }
    });

  //if all is ok create new Teacher
  let newTeacher = {
    name: teacherRegister.name,
    cpf: teacherRegister.cpf,
    cr: teacherRegister.cr,
    picture: teacherRegister.picture,
    ativo: teacherRegister.ativo,
    email: teacherRegister.email,
    dnasc: teacherRegister.dnasc,
    address: {
      cep: addressRegister.cep,
      rua_av: addressRegister.rua_av,
      nr: addressRegister.nr,
      complemento: addressRegister.complemento,
      suburb: addressRegister.suburb,
      city: addressRegister.city,
      UF: addressRegister.UF,
      fone: addressRegister.fone,
      clr: addressRegister.clr
    }
  };

  const teacher = new Teacher(newTeacher);

  try {
    const savedTeacher = await teacher.save();
    res.status(201).json({ teacher: teacher._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//remove teacher
router.delete('/remove/:_id', async (req, res) => {
  try {
    const teacher = await Teacher.deleteOne({ _id: req.params._id });
    if (teacher) {
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

//search teacher
router.get('/show/:_id', async (req, res) => {
  try {
    const teacher = await Teacher.findById({ _id: req.params._id });
    if (teacher) {
      return res.status(200).json({ 
        error: null,
        teacher: teacher });
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

//update teacher
router.put('/update/:_id', async (req, res) => {
  const data = req.body;
  try {
    const teacher = await Teacher.updateOne({ _id: req.params._id }, data);
    if (teacher) {
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

//get All teachers
router.get('/alls', async (req, res) => {
  try {
    const teacher = await Teacher.find().sort({ name: 1 });
    if (teacher.length > 0) {
      return res.status(200).json({ 
        error: null, 
        teacher: teacher });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nehum professor cadastrado no Banco de Dados.'
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

module.exports = router;
