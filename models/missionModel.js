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
  missionId: {
    type: Number,
    require: true,
  },
  deadline: {
    type: Date,
    require: true,
  },
  create_date: {
    type: Date,
    default: Date.now,
  },
  title: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    require: true,
  },
  likes: {
    type: Number,
    default: 0,
  },
  participateList: [{ account: String }],
  content: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    defalut: '진행중',
  },
  percent: {
    type: Number,
    defalut: 0,
  },
});

const Mission = mongoose.model('missions', missionSchema);
module.exports = Mission;
