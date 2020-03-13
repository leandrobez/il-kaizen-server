const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { loginValidation } = require('../helpers/validation');
const User = require('../models/User');

console.log('⚙️ Create all routes to autenticate');

//login to dashboad
router.post('/login', async (req, res) => {
  //The data will be validate before request

  const { error } = loginValidation(req.body);

  if (error) {
    //console.log(error)
    return res.json({
      error: true,
      message: { 
        type: 'warning', 
        value: error.details[0].message
       }
    });
  }
  //check if the user is already in the database
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(400).json({
      error: true,
      message: { type: 'warning', value: 'This email is wrong' }
    });
  }
  //Check password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password);
  if (!validPass)
    return res.json({
      error: true,
      message: { type: 'warning', value: 'Invalid password' }
    });
  user.password = undefined;
  //Create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: '3600s'
  });
 
  return res
    .status(200)
    .json({ 
      error: null, 
      user: { 
        name: user.name, 
        token: token 
      } 
    });
});

//logout
router.get('/logout', async (req, res) => {
  return res.status(200).json({
    error: true,
    message: { type: 'warning', value: 'User has been logged out.' }
  });
});

module.exports = router;
