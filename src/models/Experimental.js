const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const experimentalSchema = Schema({
  name: {
    type: String,
    required: true,
    min: 4,
    max: 255
  },
  phone: {
    type: String,
    default: '',
    max: 12
  },
  obs: {
    type: String,
    default: ''
  },
  dtcontact: {
    type: Date
  },
  day: {
    type: String,
    max: 255
  },
  time: {
    type: String,
    max: 255
  },
  class: {
    type: String,
    required: true,
    default: 'Pilates'
  },
  email: {
    type: String,
    required: true,
    min: 6,
    max: 255
  },
  indicated: {
    type: String,
    default: '',
    max: 255
  }
});

module.exports = mongoose.model('Experimental', experimentalSchema);
