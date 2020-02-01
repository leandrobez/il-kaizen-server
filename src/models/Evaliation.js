const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const evaliationSchema = Schema(
  {
    teacherID: {
      type: String,
      required: true
    },
    teacherName: {
      type: String,
      required: true
    },
    studentID: {
      type: String,
      required: true
    },
    studentName: {
      type: String,
      required: true
    },
    data: {
      type: Date
    },
    contents: {
      type: Object,
      data: {
        profile: {
          type: Object,
          data: {
            genre: {
              type: String
            },
            age: {
              type: String
            },
            weight: {
              type: String
            },
            alt: {
              type: String
            }
          }
        },
        perimeter: {
          type: Object,
          data: {
            torax: {
              type: Number,
              default: 0
            },
            abdome: {
              type: Number,
              default: 0
            },
            quadril: {
              type: Number,
              default: 0
            },
            antebraco_dir: {
              type: Number,
              default: 0
            },
            antebraco_esq: {
              type: Number,
              default: 0
            },
            braco_dir: {
              type: Number,
              default: 0
            },
            braco_esq: {
              type: Number,
              default: 0
            },
            coxa_dir: {
              type: Number,
              default: 0
            },
            coxa_esq: {
              type: Number,
              default: 0
            },
            panturrilha_dir: {
              type: Number,
              default: 0
            },
            panturilha_esq: {
              type: Number,
              default: 0
            },
            pulso_esq: {
              type: Number,
              default: 0
            }
          }
        },
        skinfold: {
          type: Object,
          data: {
            subscapular: {
              type: Number,
              default: 0
            },
            tricipital: {
              type: Number,
              default: 0
            },
            bicipital: {
              type: Number,
              default: 0
            },
            axilar_media: {
              type: Number,
              default: 0
            },
            peitoral: {
              type: Number,
              default: 0
            },
            supra_iliaca: {
              type: Number,
              default: 0
            },
            abdominal: {
              type: Number,
              default: 0
            },
            coxa: {
              type: Number,
              default: 0
            },
            panturilha_medial: {
              type: Number,
              default: 0
            }
          }
        },
        bones: {
          type: Object,
          data: {
            biestiloide: {
              type: Number,
              default: 0
            },
            condilo: {
              type: Number,
              default: 0
            }
          }
        },
        summary: {
          type: Object,
          data: {
            densidade_corporal: {
              type: String
            },
            pollack_constant: {
              type: String
            },
            perc_fat: {
              type: String
            },
            residual_weight: {
              type: String
            },
            bone_weight: {
              type: String
            },
            muscle_weight: {
              type: String
            },
            total_weight: {
              type: String
            },
            residual_weight: {
              type: String
            },
            body_mass: {
              type: String
            },
            ideal_weight: {
              type: String
            },
            excess_fat_weight: {
              type: String
            }
          }
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Evaliation', evaliationSchema);
