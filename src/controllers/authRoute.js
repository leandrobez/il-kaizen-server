const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { registerValidation } = require('../helpers/validation');
const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to users');
//register user
router.post('/register', async (req, res) => {
  
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: {
        type: 'danger',
        value: error.details[0].message
      }
    });
  //check if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(404).json({ error: 'Email already exists' });
  //Hash passwoards
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  //create a new User
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPassword
  });

  try {
    const savedUser = await user.save();
    return res.status(201).json(
      { error: null, 
        user: user._id 
      });
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

//search admin
router.get('/show/:_id', async (req, res) => {
  try {
    const user = await User.findById({ _id: req.params._id });
    if (user) {
      user.password = undefined;
      return res.status(200).json({ 
        error: null, 
        user: user });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não foi encontrodo um administrador com esse ID.'
        }
      });
    }
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

//list all admin
router.get('/alls', async (req, res) => {
  try {
    let userNoPwd = [];
    const users = await User.find();
    if (users.length > 0) {
      users.forEach(user => {
        userNoPwd.push({
          date: user.date,
          _id: user._id,
          name: user.name,
          email: user.email
        });
      });
      return res.status(200).json({ 
        error: null, 
        userNoPwd: userNoPwd 
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'warning',
          value: 'Você não tem permissão para fazer essa requisição'
        }
      });
    }
  } catch (error) {
    res.status(404).json({
      error: true,
      message: {
        type: 'warning',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
  }
});

//update admin
router.put('/update/:id', async (req, res) => {
  const data = req.body;
  try {
    const admin = await User.updateOne({ _id: req.params.id }, { $set: data });
    if (admin) {
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

//remove admin
router.delete('/remove/:_id', async (req, res) => {
  
  try {
    const admin = await User.deleteOne({ _id: req.params._id });
    return res.status(200).json({
      error: null,
      message: {
        type: 'success',
        value: 'O administrador foi retirado do banco de dados com sucesso!'
      }
    });
  } catch (error) {
    return res.status(404).json({
      error: true,
      message: {
        type: 'danger',
        value: error
      }
    });
  }
});

module.exports = router;
