const express = require('express');
const User = require('../models/User');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { google } = require('googleapis');
const upload = multer();
const stream = require('stream');

const CLIENT_ID = '314945976587-7kpmavpnqhiqqe2slfbo9ar2aeq0chpk.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//040vjrrQwIA0yCgYIARAAGAQSNwF-L9Irsic4qt3PKpK2xjcUCvMRPvs0tqTdAcOqatsdI4pbAuNc4mSN6XVbsFZL69VhJMBAosk';

const test = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
test.setCredentials({ refresh_token: REFRESH_TOKEN });

const uploadFile = async (fileObject, link) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  try {
    const { data } = await google.drive({ version: 'v3', auth: test }).files.create({
      media: {
        mimeType: fileObject.mimeType,
        body: bufferStream,
      },
      requestBody: {
        name: fileObject.originalname,
        parents: [link],
      },
      fields: 'id,name',
    });

    console.log(`Uploaded file ${data.name} ${data.id}`);
  } catch (e) {
    console.log(e);
  }
};

module.exports = () => {
  router.get('/', (request, response) => {
    response.render('layout', { pageTitle: 'Task Manager App', template: 'upload' });
  });

  // creating user
  router.post('/', upload.any(), async (req, res) => {
    try {
      const { body, files } = req;
      for (let f = 0; f < files.length; f += 1) {
        await uploadFile(files[f], body.link);
      }

      res.send('success');
    } catch (f) {
      res.send(f.message);
    }
  });

  return router;
};
