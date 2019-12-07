const router = require('express').Router();
const Experimental = require('../models/Experimental');

console.log('⚙️ Create all routes to experimental');

//create
router.post('/create', async (req, res) => {
  let dataExperimental = {
    name: req.body.name,
    phone: req.body.phone,
    obs: req.body.obs,
    dtcontact: req.body.dtcontact,
    day: req.body.day,
    time: req.body.time,
    class: req.body.class,
    email: req.body.email,
    indicated: req.body.indicated
  };

  //if all is ok create new Student
  let newExperimental = {
    name: dataExperimental.name,
    phone: dataExperimental.phone,
    obs: dataExperimental.obs,
    dtcontact: dataExperimental.dtcontact,
    day: dataExperimental.day,
    class: dataExperimental.class,
    email: dataExperimental.email,
    indicated: dataExperimental.indicated
  };

  const experimental = new Experimental(newExperimental);

  try {
    const savedExperimental = await experimental.save();
    res.status(201).json({ experimental: experimental._id });
  } catch (error) {
    res
      .status(400)
      .json({ error: true, message: { type: 'warning', value: error.errors } });
  }
});

module.exports = router;
