const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerSchema = Schema(
  {
    studentID: {
      type: String,
      unique: true,
      required: true
    },
    teacher: {
      type: String,
      required: true,
      min: 4,
      max: 255
    },
    schedule: {
      type: Array,
      data: {
        day: {
          type: String,
          required: true
        },
        class: {
          type: String,
          default: 'Pilates',
          required: true
        },
        start: {
          type: String,
          required: true
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Register', registerSchema);
