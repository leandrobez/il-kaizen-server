const router = require('express').Router();
const Fixed = require('../models/Fixed');

const { expensesRegisterValidation } = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to expenses fixed');

//route register payment -- @postif don´t have any payments
router.post('/create', async (req, res) => {
  const { error } = expensesRegisterValidation(req.body);
  if (error)
    return res.status(400).json({
      error: true,
      message: { type: 'warning', value: error.details[0].message }
    });
  let expenses = {
    date: req.body.expenses[0].date,
    name: req.body.expenses[0].name,
    valor: req.body.expenses[0].valor,
    executed: req.body.expenses[0].executed
  };

  //first payment to month
  //create a new Fixed
  const fixed = new Fixed({
    month: req.body.month,
    expenses: [expenses]
  });

  try {
    const savedFixed = await fixed.save();
    res.status(201).json({ error: null, fixed: fixed._id });
  } catch (error) {
    res.status(400).json({
      error: true,
      message: { type: 'warning', value: error.errors }
    });
  }
});

//route search fixed id -- @get
router.get('/show/:_id', async (req, res) => {
  try {
    const fixed = await Fixed.find({ _id: req.params._id });
    if (fixed.length > 0) {
      return res.status(200).json({ error: null, fixed: fixed });
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

// !route search fixed month -- @get
router.get('/show/month/:m', async (req, res) => {
  try {
    const fixed = await Fixed.find({ month: req.params.m });
    if (fixed.length > 0) {
      res.status(200).json({ error: null, fixed });
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
        type: 'warming',
        value: 'Você não tem permissão para fazer essa requisição'
      }
    });
  }
});

//route list alls  -- @get
router.get('/alls', async (req, res) => {
  try {
    const fixed = await Fixed.find();
    if (fixed.length > 0) {
      return res.status(200).json({ error: null, fixed: fixed });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há listagem de contas fixas registradas.'
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
  }
});

//route update --@put
router.put('/update/:_id', async (req, res) => {
  const data = req.body;
  try {
    const fixed = await Fixed.updateOne({ _id: req.params._id }, data);

    if (fixed) {
      return res.status(200).json({
        error: false,
        message: { type: 'succes', value: 'Atualização feita com sucesso!' }
      });
    } else {
      return res.status(404).json({
        error: true,
        message: {
          type: 'danger',
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
