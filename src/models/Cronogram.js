const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cronogramSchema = Schema(
  {
    teacher: {
      type: String,
      required: true,
      min: 4,
      max: 255
    },
    contents: {
      type: Array,
      data: {
        month: {
          type: String,
          required: true
        },
        schedule: {
          type: Array,
          data: {
            day: {
              type: String,
              required: true
            },
            events: {
              type: Array,
              data: {
                students: {
                  type: Array
                },
                details: {
                  type: Object,
                  data: {
                    timeKey: {
                      type: Number,
                      required: true
                    },
                    start: {
                      type: String,
                      required: true
                    },
                    end: {
                      type: String,
                      required: true
                    },
                    class: {
                      type: String,
                      required: true
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cronogram', cronogramSchema);
