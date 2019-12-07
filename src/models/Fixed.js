const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const fixedSchema = Schema(
  {
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
          required: true
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('fixed', fixedSchema);
