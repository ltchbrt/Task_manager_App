const express = require('express');
const LoginRoute = require('./login');
const SignupRoute = require('./signup');
const DashboardRoute = require('./dashboard');
const UploadRoute = require('./upload');
const router = express.Router();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Task Manager App', template: 'index' });
  });
  router.use('/login', LoginRoute());
  router.use('/signup', SignupRoute());
  router.use('/dashboard', DashboardRoute());
  router.use('/upload', UploadRoute());
  return router;
};
