const mongoose = require('mongoose');

const accountSchema = mongoose.Schema({
  address: {
    type: String,
    require: true,
  },
  phoneNumber: {
    type: String,
    require: true,
  },
  participateList: [{ missionId: String }],
  create_date: {
    type: Date,
    default: Date.now,
  },
});

const Account = mongoose.model('accounts', accountSchema);
module.exports = Account;
