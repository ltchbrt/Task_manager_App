const mongoose = require('mongoose');

const ThemeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Can't be blank"],
    },
    user: {
      type: String,
    },
    status: {
      type: String,
    },
    link: {
      type: String,
    },
  },
  { minimize: false }
);

const Theme = mongoose.model('Theme', ThemeSchema);

module.exports = Theme;
