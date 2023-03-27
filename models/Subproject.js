const mongoose = require('mongoose');

const SubprojectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    project: {
      type: String,
    },

    mainproject: {
      type: String,
    },
    status: {
      type: String,
    },
    date: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { minimize: false }
);

const Subproject = mongoose.model('Subproject', SubprojectSchema);

module.exports = Subproject;
