const express = require('express');
const User = require('../models/User');

const router = express.Router();

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Task Manager App', template: 'signup' });
  });

  // creating user
  router.post('/', async (req, res) => {
    try {
      const { name, email, password } = req.body;
      console.log(req.body.name);
      const user = await User.create({ name, email, password });
      res.redirect('/login');
    } catch (e) {
      let msg;
      if (e.code == 11000) {
        msg = 'User already exists';
      } else {
        msg = e.message;
      }
      console.log(e);
      res.status(400).json(msg);
    }
  });

  return router;
};
