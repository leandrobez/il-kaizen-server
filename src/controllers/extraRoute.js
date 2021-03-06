const router = require('express').Router();
const Extra = require('../models/Extra');

const { expensesRegisterValidation } = require('../helpers/validation');

const authMiddleware = require('../middleware/auth');

router.use(authMiddleware);

console.log('⚙️ Create all routes to expenses extra');

//route register extra -- @postif don´t have any extra
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

  //create a new Extra
  const extra = new Extra({
    month: req.body.month,
    expenses: [expenses]
  });

  try {
    const savedExtra = await extra.save();
    res.status(201).json({ error: null, extra: extra._id });
  } catch (error) {
    res.status(400).send({
      error: true,
      message: {
        type: 'warning',
        value: error.errors
      }
    });
  }
});
//route search extra id -- @get
router.get('/show/:_id', async (req, res) => {
  try {
    const extra = await Extra.find({ _id: req.params._id });
    if (extra.length > 0) {
      return res.status(200).json({ error: null, extra });
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
// !route search extra month -- @get
router.get('/show/month/:m', async (req, res) => {
  try {
    const extra = await Extra.find({ month: req.params.m });
    if (extra.length > 0) {
      res.status(200).json({ error: null, extra: extra });
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
    const extra = await Extra.find();
    console.log(extra);
    if (extra.length > 0) {
      return res.status(200).json({ error: null, extra: extra });
    } else {
      return res.json({
        error: true,
        message: {
          type: 'warning',
          value: 'Não há dados referente as contas extras.'
        }
      });
    }
  } catch (error) {
    res.status(401).json({
      error: true,
      message: {
        type: 'warning',
        value: 'Não há listagem de contas extras registradas'
      }
    });
  }
});
//route update --@put
router.put('/update/:_id', async (req, res) => {
  const data = req.body;
  try {
    const extra = await Extra.updateOne({ _id: req.params._id }, data);

    if (extra) {
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
