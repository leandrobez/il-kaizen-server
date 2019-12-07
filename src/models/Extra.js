const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const extrasSchema = Schema({
    month: {
      type: String,
      required: true
    },
    expenses: {
      type: Array,
      data: {
        name: {
          description: String,
          required: true,
          min: 6,
          max: 255,
          trim: true
        },
        valor: {
          type: Number,
          required: true
        },
        executed: {
          type: Boolean,
          required: true,
          default: false
        },
        date: {
          type: Date,
          default: Date.now()
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Extras', extrasSchema);
