const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const upload = multer();


module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', {
      pageTitle: 'Task Manager App',
      template: 'login',
    });
  });

  router.post('/', upload.any(), async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findByCredentials(email, password);
      res.cookie('email', email);
      user.status = 'online';
      await user.save();
      res.send('success');
    } catch (e) {
      res.status(400).json(e.message);
    }
  });

  return router;
};
