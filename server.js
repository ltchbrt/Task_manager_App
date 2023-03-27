const { request, response } = require('express');
const express = require('express');
const path = require('path');
const createError = require('http-errors');
const bodyParser = require('body-parser');
const routes = require('./routes');
const { Template } = require('ejs');
const User = require('./models/User');
const Message = require('./models/Message');
const Project = require('./models/Project');
const Theme = require('./models/Theme');
const Subproject = require('./models/Subproject');
const Member = require('./models/Member');
const mongoose = require('mongoose');
const app = express();
const port = process.env.port || 3000;

//database connections
const username = 'test';
const password = 'rciYudMcOoYADWF1';
const cluster = 'cluster0.thsgo98';
const dbname = 'test';

mongoose.connect(
  `mongodb+srv://${username}:${password}@${cluster}.mongodb.net/${dbname}?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error: '));
db.once('open', function () {
  console.log('Connected successfully');
});

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.locals.siteName = 'Express JS';

app.use(express.static(path.join(__dirname, './static')));
app.use('/static', express.static('static'));

app.use('/', routes());

app.use((request, response, next) => {
  return next(createError(404, 'File not found'));
});

app.use((err, request, response, next) => {
  response.locals.message = err.message;
  const status = err.status || 500;
  response.locals.status = status;
  response.status(status);
  response.render('error');
});

app.listen(port, () => {
  console.log(`Express server listening on port ${port}!`);
});
