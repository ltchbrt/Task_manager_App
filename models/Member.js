const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema(
  {
    mem_name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    project: {
      type: String,
    },

    mainproject: {
      type: String,
    },
    subproject: {
      type: String,
    },
    status: {
      type: String,
    },
  },
  { minimize: false }
);

const Member = mongoose.model('Member', MemberSchema);

module.exports = Member;
