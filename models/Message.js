const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  content: String,
  user: String,
  socketid: String,
  time: String,
  mainproject: String,
  project: String,
  subproject: String,
});

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;
