const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
      min: 6,
      max: 255
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 6,
      max: 1024,
      selected: false
    },
    date: {
      type: Date,
      default: Date.now()
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
