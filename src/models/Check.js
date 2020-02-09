const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const checkSchema = Schema({
  paymentID: {
    type: String,
    required: true
  },
  studentID: {
    type: String,
    required: true
  },
  bank: {
    type: String,
    required: true
  },
  numberCheck: {
    type: String,
    required: true
  },
  amountCheck: {
    type: Number,
    required: true
  },
  targetCheck: {
    type: String,
    required: true,
    default: 'Pessoal'
  }
});

module.exports = mongoose.model('Check', checkSchema);
