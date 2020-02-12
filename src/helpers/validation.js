//validation
const Joi = require('@hapi/joi');

//validate CPF
const isValidCPF = cpf => {
  //if(cpf == '') return false
  if (cpf == '' || cpf == '00000000000') return true;
  let Soma, Resto;
  Soma = 0;
  if (cpf == '00000000000') return false;

  for (let i = 1; i <= 9; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (11 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(9, 10))) return false;

  Soma = 0;
  for (let i = 1; i <= 10; i++)
    Soma = Soma + parseInt(cpf.substring(i - 1, i)) * (12 - i);
  Resto = (Soma * 10) % 11;

  if (Resto == 10 || Resto == 11) Resto = 0;
  if (Resto != parseInt(cpf.substring(10, 11))) return false;
  return true;
};

//Register Validation
const registerValidation = data => {
  const checkSchema = {
    name: Joi.string()
      .min(6)
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, checkSchema);
};

//Login Validation
const loginValidation = data => {
  const checkSchema = {
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .min(6)
      .required()
  };
  return Joi.validate(data, checkSchema);
};

//student validation
const studentRegisterValidation = data => {
  const checkSchema = {
    name: Joi.string()
      .min(4)
      .max(1024)
      .required(),
    genre: Joi.string().required(),
    cpf: Joi.string()
      .required()
      .max(11),
    vezes: Joi.number().required(),
    valor: Joi.number().required(),
    obs: Joi.string(),
    origem: Joi.string().max(255),
    ativo: Joi.boolean().required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    dnasc: Joi.date(),
    desc: {
      perc: Joi.number(),
      abs: Joi.number()
    },
    address: {
      cep: Joi.string()
        .min(8)
        .max(8)
        .required(),
      rua_av: Joi.string()
        .required()
        .max(255),
      nr: Joi.string()
        .required()
        .max(5),
      complemento: Joi.string().max(255),
      suburb: Joi.string().max(128),
      city: Joi.string()
        .required()
        .max(255),
      UF: Joi.string()
        .required()
        .max(2),
      fone: Joi.string().max(12),
      clr: Joi.string().max(13)
    }
  };

  return Joi.validate(data, checkSchema);
};

//teacher validation
const teacherRegisterValidation = data => {
  const checkSchema = {
    name: Joi.string()
      .min(4)
      .max(1024)
      .required(),
    cpf: Joi.string()
      .required()
      .max(11),
    ativo: Joi.boolean().required(),
    email: Joi.string()
      .min(6)
      .max(255)
      .required()
      .email(),
    dnasc: Joi.date(),
    cr: Joi.string().required(),
    picture: Joi.string(),
    address: {
      cep: Joi.string()
        .min(8)
        .max(8)
        .required(),
      rua_av: Joi.string()
        .required()
        .max(255),
      nr: Joi.string()
        .required()
        .max(5),
      complemento: Joi.string().max(255),
      suburb: Joi.string().max(128),
      city: Joi.string()
        .required()
        .max(255),
      UF: Joi.string()
        .required()
        .max(2),
      fone: Joi.string().max(12),
      clr: Joi.string().max(13)
    }
  };

  return Joi.validate(data, checkSchema);
};

//payment validation
const paymentRegisterValidation = data => {
  const checkSchema = {
    month: Joi.string().required(),
    students: Joi.array().items(
      Joi.object({
        studentID: Joi.string().required(),
        studentName: Joi.string().required(),
        datePayment: Joi.date(),
        amountPayment: Joi.number().required(),
        formPayment: Joi.string().required(),
        obs: Joi.string(),
        sendMessage: Joi.boolean(),
        sendReceipt: Joi.boolean()
      })
    )
  };
  return Joi.validate(data, checkSchema);
};

//expenses validation
const expensesRegisterValidation = data => {
  const checkSchema = {
    month: Joi.string().required(),
    expenses: Joi.array().items(
      Joi.object({
        name: Joi.string().required(),
        valor: Joi.number().required(),
        executed: Joi.boolean(),
        date: Joi.date()
      })
    )
  };
  return Joi.validate(data, checkSchema);
};

//register
const userRegisterValidation = data => {
  const checkSchema = {
    studentID: Joi.string().required(),
    teacher: Joi.string()
      .min(4)
      .max(255)
      .required(),
    schedule: Joi.array().items(
      Joi.object({
        day: Joi.string().required(),
        class: Joi.string().required(),
        start: Joi.string().required()
      })
    )
  };
  return Joi.validate(data, checkSchema);
};

//cronogram
const cronogramValidation = data => {
  const checkSchema = {
    teacher: Joi.string()
      .required()
      .min(4)
      .max(255),
    contents: Joi.array().items(
      Joi.object({
        month: Joi.string()
          .required()
          .min(3),
        schedule: Joi.array().items(
          Joi.object({
            day: Joi.string()
              .required()
              .min(2),
            events: Joi.array().items({
              students: Joi.array().length(1),
              details: {
                timeKey: Joi.number().required(),
                start: Joi.string().required(),
                end: Joi.string().required(),
                class: Joi.string()
                  .required()
                  .min(3)
              }
            })
          })
        )
      })
    )
  };
  return Joi.validate(data, checkSchema);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.studentRegisterValidation = studentRegisterValidation;
module.exports.teacherRegisterValidation = teacherRegisterValidation;
module.exports.paymentRegisterValidation = paymentRegisterValidation;
module.exports.expensesRegisterValidation = expensesRegisterValidation;
module.exports.isValidCPF = isValidCPF;
module.exports.userRegisterValidation = userRegisterValidation;
module.exports.cronogramValidation = cronogramValidation;
