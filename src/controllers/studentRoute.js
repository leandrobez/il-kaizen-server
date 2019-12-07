const router = require('express').Router();
const Student = require('../models/Student');

//validations
const {
  studentRegisterValidation,
  isValidCPF
} = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to students');
//register especific student
router.post('/register', async (req, res) => {
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
  let studentRegister = {
    name: req.body.name,
    genre: req.body.genre,
    cpf: req.body.cpf,
    vezes: req.body.vezes,
    valor: req.body.valor,
    obs: req.body.obs,
    origem: req.body.origem,
    ativo: req.body.ativo,
    email: req.body.email,
    dnasc: req.body.dnasc,
    desc: {
      perc: req.body.desc.perc,
      abs: req.body.desc.abs
    },
    address: addressRegister
  };
  //validation persoanl register
  const { error } = studentRegisterValidation(studentRegister);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });
});

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
  let studentRegister = {
    name: req.body.name,
    genre: req.body.genre,
    cpf: req.body.cpf,
    vezes: req.body.vezes,
    valor: req.body.valor,
    obs: req.body.obs,
    origem: req.body.origem,
    ativo: req.body.ativo,
    email: req.body.email,
    dnasc: req.body.dnasc,
    desc: {
      perc: req.body.desc.perc,
      abs: req.body.desc.abs
    },
    address: addressRegister
  };

  //validation persoanl register
  const { error } = studentRegisterValidation(studentRegister);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  //check if cpf is ok
  const cpfOK = isValidCPF(studentRegister.cpf);
  if (!cpfOK)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'CPF não válido. Por favor verique a informação postada!'
      }
    });
  if (studentRegister.cpf !== '00000000000') {
    //check if cpf is unique
    const cpfExist = await Student.findOne({ cpf: studentRegister.cpf });
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
  const emailExist = await Student.findOne({ email: studentRegister.email });
  if (emailExist)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Email already exists'
      }
    });

  //if all is ok create new Student
  let newStudent = {
    name: studentRegister.name,
    genre: studentRegister.genre,
    cpf: studentRegister.cpf,
    vezes: studentRegister.vezes,
    valor: studentRegister.valor,
    obs: studentRegister.obs,
    origem: studentRegister.origem,
    ativo: studentRegister.ativo,
    email: studentRegister.email,
    dnasc: studentRegister.dnasc,
    desc: {
      perc: studentRegister.desc.perc,
      abs: studentRegister.desc.abs
    },
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

  const student = new Student(newStudent);

  try {
    const savedStudent = await student.save();
    res.status(201).json({ student: student._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

//register student
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
  let studentRegister = {
    name: req.body.name,
    genre: req.body.genre,
    cpf: req.body.cpf,
    vezes: req.body.vezes,
    valor: req.body.valor,
    obs: req.body.obs,
    origem: req.body.origem,
    ativo: req.body.ativo,
    email: req.body.email,
    dnasc: req.body.dnasc,
    desc: {
      perc: req.body.desc.perc,
      abs: req.body.desc.abs
    },
    address: addressRegister
  };

  //validation persoanl register
  const { error } = studentRegisterValidation(studentRegister);
  if (error)
    return res.json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });

  //check if cpf is ok
  const cpfOK = isValidCPF(studentRegister.cpf);
  if (!cpfOK)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'CPF não válido. Por favor verique a informação postada!'
      }
    });

  //check if cpf is unique
  const cpfExist = await Student.findOne({ cpf: studentRegister.cpf });
  if (cpfExist)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value:
          'Esse CPF já está cadastrado. Por favor verique a informação postada!'
      }
    });

  //check if the user is already in the database
  const emailExist = await Student.findOne({ email: studentRegister.email });
  if (emailExist)
    return res.json({
      error: true,
      message: {
        type: 'warning',
        value: 'Email already exists'
      }
    });

  //if all is ok create new Student
  let newStudent = {
    name: studentRegister.name,
    genre: studentRegister.genre,
    cpf: studentRegister.cpf,
    vezes: studentRegister.vezes,
    valor: studentRegister.valor,
    obs: studentRegister.obs,
    origem: studentRegister.origem,
    ativo: studentRegister.ativo,
    email: studentRegister.email,
    dnasc: studentRegister.dnasc,
    desc: {
      perc: studentRegister.desc.perc,
      abs: studentRegister.desc.abs
    },
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

  const student = new Student(newStudent);

  try {
    const savedStudent = await student.save();
    res.status(201).json({ student: student._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

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

//get All students
router.get('/alls', async (req, res) => {
  try {
    const student = await Student.find().sort({ name: 1 });
    if (student.length > 0) {
      return res.status(200).json({ error: null, student: student });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há nehum aluno cadastrado no Banco de Dados.'
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
