const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const registerSchema = Schema(
  {
    student: {
      type: String,
      unique: true,
      required: true
    },
    name: {
      type: String,
      required: true,
      min: 4,
      max: 255
    },
    vezes: {
      type: Number,
      required: true,
      default: 1
    },
    valor: {
      type: Number,
      required: true
    },
    class: {
      type: String,
      required: true,
      default: 'Pilates'
    },
    teacher: {
      type: String,
      required: true,
      min: 4,
      max: 255
    },
    obs: {
      type: String,
      default: ''
    },
    sendmsg: {
      type: Boolean,
      default: false
    },
    desc: {
      type: Object,
      data: {
        perc: {
          type: Number,
          default: 0
        },
        abs: {
          type: Number,
          default: 0
        }
      }
    },
    schedule: {
      type: Array,
      data: {
        day: {
          type: String,
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
