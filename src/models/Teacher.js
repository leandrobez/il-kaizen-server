const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const teacherSchema = Schema(
  {
    name: {
      type: String,
      required: true,
      min: 4,
      max: 255
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
    cpf: {
      type: String,
      required: true,
      max: 11
    },
    cr: {
      type: String,
      required: true
    },
    ativo: {
      type: Boolean,
      required: true,
      default: true
    },
    picture: {
      type: String,
      required: false
    },
    dnasc: {
      type: Date
    },
    address: {
      type: Object,
      data: {
        cep: {
          type: String,
          required: true,
          default: '90810150',
          min: 8,
          max: 8
        },
        rua_av: {
          type: String,
          required: true,
          default: 'Rua que sobe desce e o número não aparece',
          max: 255
        },
        nr: {
          type: String,
          required: true,
          default: '0000',
          max: 5
        },
        complemento: {
          type: String,
          default: '',
          max: 255
        },
        suburb: {
          type: String,
          default: 'Bairro 1',
          max: 128
        },
        city: {
          type: String,
          required: true,
          default: 'Porto Alegre',
          max: 255
        },
        UF: {
          type: String,
          required: true,
          default: 'RS',
          max: 2
        },
        fone: {
          type: String,
          default: '5133333333',
          max: 10
        },
        clr: {
          type: String,
          default: '51999999999',
          max: 11
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Teacher', teacherSchema);
