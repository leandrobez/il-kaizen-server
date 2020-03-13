const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = Schema({
  month: {
    type: String,
    required: true
  },
  students: {
    type: Array,
    data: {
      studentID: {
        type: String,
        unique: true,
        required: true
      },
      studentName: {
        type: String,
        required: true
      },
      datePayment: {
        type: Date,
        required: true
      },
      amountPayment: {
        type: Number,
        required: true
      },
      formPayment: {
        type: String,
        required: true,
        default: 'Cheque'
      },
      obs: {
        type: String
      },
      sendMessage: {
        type: String,
        default: ''
      },
      sendReceipt: {
        type: String,
        default: ''
      }
    }
  }
});

module.exports = mongoose.model('Payment', paymentSchema);
