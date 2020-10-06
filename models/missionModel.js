const mongoose = require('mongoose');

const missionSchema = mongoose.Schema({
  category: {
    type: String,
    require: true,
  },
  account: {
    type: String,
    require: true,
  },
  page: {
    type: String,
    require: true,
  },
  tag: {
    type: String,
    require: true,
  },
  goal: {
    type: Number,
    require: true,
  },
  reward: {
    type: Number,
    require: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const Mission = mongoose.model('missions', missionSchema);
module.exports = Mission;
