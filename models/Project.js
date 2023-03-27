const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    project: {
      type: String,
    },
    email: {
      type: String,
    },
  },
  { minimize: false }
);

const Project = mongoose.model('Project', ProjectSchema);

module.exports = Project;
