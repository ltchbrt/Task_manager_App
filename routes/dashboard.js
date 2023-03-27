const { request } = require('express');
const express = require('express');
const Project = require('../models/Project');
const Theme = require('../models/Theme');
const User = require('../models/User');
const Subproject = require('../models/Subproject');
const Member = require('../models/Member');
const Message = require('../models/Message');
var LocalStorage = require('node-localstorage').LocalStorage,
  localStorage = new LocalStorage('./scratch');
var store = require('store');
const router = express.Router();
const multer = require('multer');
const upload = multer();
const path = require('path');
const { google } = require('googleapis');
const stream = require('stream');

const CLIENT_ID = '314945976587-7kpmavpnqhiqqe2slfbo9ar2aeq0chpk.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN =
  '1//040vjrrQwIA0yCgYIARAAGAQSNwF-L9Irsic4qt3PKpK2xjcUCvMRPvs0tqTdAcOqatsdI4pbAuNc4mSN6XVbsFZL69VhJMBAosk';

const test = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
test.setCredentials({ refresh_token: REFRESH_TOKEN });

module.exports = () => {
  router.get('/', async (req, res) => {
    const task = store.get('task');
    res.render('layout', {
      pageTitle: 'Task Manager App',
      template: 'dashboard',
    });
  });

  router.get('/data', async (req, res) => {
    const fetchUser = await User.find();
    const fetchMember = await Member.find();
    const fetchTheme = await Theme.find();
    const fetchSubproject = await Subproject.find();
    const fetchData = await Project.find();
    const fetchMessage = await Message.find();
    res.send(
      JSON.stringify({
        fetchUser,
        fetchMember,
        fetchTheme,
        fetchSubproject,
        fetchData,
        fetchMessage,
      })
    );
  });

  // create theme
  router.post('/theme', upload.any(), async (req, res) => {
    try {
      const { name, user } = req.body;
      console.log(req.body);
      const drive = google.drive({ version: 'v3', auth: test });
      const service = await drive.files
        .create({
          resource: {
            name: name,
            mimeType: 'application/vnd.google-apps.folder',
            parents: ['1YiN_vfGSW6bwcoiViZGjSDCHV0PY_Dvm'],
          },
        })
        .catch((err) => console.log(err));
      const link = service.data.id;
      const status = 'Admin';
      const group = await Theme.create({ name, user, status, link });
      const mainproject = name;
      const project = name;
      const mem_name = user;

      const group1 = await Member.create({ mem_name, project, mainproject, status });
      res.send('success');
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

  // edit theme
  router.post('/edit_theme', upload.any(), async (req, res) => {
    try {
      const { name, edit_theme } = req.body;
      console.log(req.body);
      const query = await Theme.updateOne({ name: edit_theme }, { $set: { name: name } });
      const query1 = await Project.updateMany({ project: edit_theme }, { $set: { project: name } });
      const query2 = await Subproject.updateMany(
        { mainproject: edit_theme },
        { $set: { mainproject: name } }
      );
      const query3 = await Member.updateMany(
        { mainproject: edit_theme },
        { $set: { mainproject: name } }
      );
      const query4 = await Message.updateMany(
        { mainproject: edit_theme },
        { $set: { mainproject: name } }
      );

      const query11 = await Project.updateOne({ name: edit_theme }, { $set: { name: name } });
      const query12 = await Subproject.updateMany(
        { project: edit_theme },
        { $set: { project: name } }
      );
      const query13 = await Member.updateMany({ project: edit_theme }, { $set: { project: name } });

      const query14 = await Message.updateMany(
        { project: edit_theme },
        { $set: { project: name } }
      );
      res.send('success');
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

  // delete theme

  router.post('/delete_theme', upload.any(), async (req, res) => {
    try {
      const { delete_theme } = req.body;
      console.log(req.body);
      const query = await Theme.deleteMany({ name: delete_theme });
      const query1 = await Project.deleteMany({ project: delete_theme });
      const query2 = await Subproject.deleteMany({ mainproject: delete_theme });
      const query3 = await Member.deleteMany({ mainproject: delete_theme });
      const query4 = await Message.deleteMany({ mainproject: delete_theme });

      res.send('success');
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

  // create project
  router.post('/create', async (req, res) => {
    try {
      const { name, project } = req.body;
      console.log(req.body.name);
      const group = await Project.create({ name, project, email });
      store.set('name', project);
      res.redirect('/dashboard');
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

  // edit project
  router.post('/edit_project', upload.any(), async (req, res) => {
    try {
      const { name, edit_project } = req.body;
      console.log(req.body);
      const query = await Project.updateOne({ name: edit_project }, { $set: { name: name } });
      const query1 = await Subproject.updateMany(
        { project: edit_project },
        { $set: { project: name } }
      );
      const query2 = await Member.updateMany(
        { project: edit_project },
        { $set: { project: name } }
      );

      const query3 = await Message.updateMany(
        { project: edit_project },
        { $set: { project: name } }
      );
      res.send('success');
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

  // delete project

  router.post('/delete_project', upload.any(), async (req, res) => {
    try {
      const { delete_project } = req.body;
      console.log(req.body);
      const query = await Project.deleteOne({ name: delete_project });
      const query1 = await Subproject.deleteMany({ project: delete_project });
      const query3 = await Message.deleteMany({ project: delete_project });
      res.send('success');
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

  // display name and project
  router.post('/', async (request, response) => {
    try {
      var count = 0;
      const { theme_name, project, email } = request.body;
      const name = theme_name;
      const user = await Project.find({ name: name });
      if (user.length) {
        for (var k = 0; k < user.length; k++) {
          if (user[k].name === name) {
            count += 1;
          }
        }
      }
      if (count === 0) {
        const group = await Project.create({ name, project, email });
      }

      response.render('layout', {
        pageTitle: 'Task Manager App',
        template: 'dashboard',
      });
    } catch (e) {
      response.redirect('/dashboard');
    }
  });

  // create subproject
  router.post('/subproject', upload.any(), async (req, res) => {
    try {
      const { name, project, mainproject, email } = req.body;
      const date = new Date().toLocaleDateString();
      const status = 'Pending';
      const group = await Subproject.create({ name, project, mainproject, status, date, email });
      const user = await Member.find({ status: 'Admin' });
      console.log(user[0].subproject);
      if (user[0].subproject == null || user[0].subproject == '' || user[0].subproject == ' ') {
        const query1 = await Member.updateOne(
          { mainproject: mainproject, status: 'Admin' },
          { $set: { subproject: name } }
        );
      } else {
        const status = 'Admin';
        var subproject = name;
        var mem_name = email;
        const group1 = await Member.create({ mem_name, project, mainproject, status, subproject });
      }
      res.send('success');
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

  // edit subproject
  router.post('/edit_subproject', upload.any(), async (req, res) => {
    try {
      const { name, edit_subproject, sub_mainproject } = req.body;
      console.log(req.body);
      const query = await Subproject.updateOne(
        { name: edit_subproject, mainproject: sub_mainproject },
        { $set: { name: name } }
      );
      const query1 = await Member.updateMany(
        { subproject: edit_subproject, mainproject: sub_mainproject },
        { $set: { subproject: name } }
      );
      const query2 = await Message.updateMany(
        { subproject: edit_subproject, mainproject: sub_mainproject },
        { $set: { subproject: name } }
      );
      res.send('success');
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

  // delete subproject

  router.post('/delete_subproject', upload.any(), async (req, res) => {
    try {
      const { delete_subproject, subdelete_mainproject } = req.body;
      console.log(req.body);
      const query = await Subproject.deleteOne({
        name: delete_subproject,
        mainproject: subdelete_mainproject,
      });
      const query1 = await Member.deleteMany({
        subproject: delete_subproject,
        mainproject: subdelete_mainproject,
      });
      const query2 = await Message.deleteMany({
        subproject: delete_subproject,
        mainproject: subdelete_mainproject,
      });
      res.send('success');
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

  // create Member
  router.post('/member', upload.any(), async (req, res) => {
    var count = 0;
    try {
      const { mem_name, project1, mainproject, subproject } = req.body;
      const project = project1;
      const status = 'Member';
      console.log(req.body);
      const group = await Member.create({ mem_name, project, mainproject, subproject, status });
      const name = mainproject;
      const user = mem_name;
      const theme = await Theme.find({ name: name, user: user });
      if (theme.length) {
        for (var k = 0; k < theme.length; k++) {
          if (theme[k].name === name) {
            count += 1;
          }
        }
      }
      if (count === 0) {
        const group12 = await Theme.create({ name, user });
      }
    } catch (e) {
      let msg;
      if (e.code == 11000) {
        msg = 'Member already exists';
      } else {
        msg = e.message;
      }
      console.log(e);
      res.status(400).json(msg);
    }

    // Create project for member
    try {
      const { mem_name, project1, mainproject } = req.body;
      const name = project1;
      const project = mainproject;
      const email = mem_name;
      const test = await Project.find({ name: name, email: email });
      if (test.length) {
        for (var l = 0; l < test.length; l++) {
          if (test[l].name === name) {
            count += 1;
          }
        }
      }
      if (count === 0) {
        const group1 = await Project.create({ name, project, email });
      }
    } catch (e) {
      let msg;
      if (e.code == 11000) {
        msg = 'Member already exists';
      } else {
        msg = e.message;
      }
      console.log(e);
      res.status(400).json(msg);
    }

    res.send('success');
  });

  // delete member

  router.post('/delete_member', upload.any(), async (req, res) => {
    try {
      const { delete_member, delete_mainproject, subproject } = req.body;
      console.log(req.body);
      const query = await Member.deleteOne({
        mem_name: delete_member,
        mainproject: delete_mainproject,
        subproject: subproject,
      });
      const query3 = await Message.deleteMany({ user: delete_member });
      const query4 = await Subproject.deleteOne({ user: delete_member, name: subproject });
      const theme = await Member.find({ mem_name: delete_member, mainproject: delete_mainproject });
      var count = 0;
      if (theme.length) {
        for (var k = 0; k < theme.length; k++) {
          if (theme[k].mem_name === delete_member) {
            count += 1;
          }
        }
      }
      if (count === 0) {
        const group12 = await Theme.deleteOne({ name: delete_mainproject, user: delete_member });
        const query1 = await Project.deleteMany({
          project: delete_mainproject,
          email: delete_member,
        });
        const query4 = await Subproject.deleteMany({
          user: delete_member,
          mainproject: delete_member,
        });
      }
      res.send('success');
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

  // Groupchat

  router.post('/chat', upload.any(), async (req, res) => {
    try {
      const { content, user, mainproject, project, subproject } = req.body;
      console.log(req.body);
      const time = new Date().toLocaleDateString();
      const query = await Message.create({ content, user, time, mainproject, project, subproject });
      store.set('task', subproject);
      res.redirect('/dashboard');
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

  // edit chat
  router.post('/chat_edit', upload.any(), async (req, res) => {
    try {
      const { content, content_det } = req.body;
      console.log(req.body);
      const query = await Message.updateOne(
        { content: content_det },
        { $set: { content: content } }
      );
      res.redirect('/dashboard');
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

  // delete chat

  router.post('/delete_chat', upload.any(), async (req, res) => {
    try {
      const { delete_chat } = req.body;
      console.log(req.body);

      const query3 = await Message.deleteOne({ content: delete_chat });

      res.redirect('/dashboard');
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

  // edit status
  router.post('/edit_status', upload.any(), async (req, res) => {
    try {
      const { status, edit_status, edit_statusgroup, status_mainproject } = req.body;
      console.log(req.body);
      const query = await Subproject.updateMany(
        { status: edit_status, name: edit_statusgroup, mainproject: status_mainproject },
        { $set: { status: status } }
      );
      res.send('success');
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

  router.post('/transfer', upload.any(), async (req, res) => {
    const { email, theme, mem_name, link } = req.body;
    const service = google.drive({ version: 'v3', auth: test });
    try {
      const permission = await service.permissions.create({
        fileId: link,
        fields: 'id',
        sendNotificationEmail: true,
        requestBody: {
          type: 'user',
          role: 'writer',
          emailAddress: mem_name, // new owner email
        },
      });
      var result = permission.data.id;

      const face = await service.permissions.update({
        fileId: link,
        permissionId: result,

        fields: 'id',
        resource: {
          role: 'writer',
          pendingOwner: true,
        },
      });

      const query = await Theme.updateOne(
        { name: theme, user: mem_name },
        { $set: { user: email } }
      );
      const query1 = await Theme.updateOne(
        { name: theme, user: email },
        { $set: { user: mem_name } }
      );

      const query4 = await Subproject.updateMany(
        { mainproject: theme, email: email },
        { $set: { email: mem_name } }
      );
      const query2 = await Subproject.updateMany(
        { mainproject: theme, email: mem_name },
        { $set: { email: email } }
      );

      const query3 = await Member.updateMany(
        { mainproject: theme, mem_name: email, status: 'Admin' },
        { $set: { mem_name: mem_name } }
      );

      const query5 = await Member.updateMany(
        { mainproject: theme, mem_name: mem_name, status: 'Member' },
        { $set: { mem_name: email } }
      );

      const query7 = await Message.updateMany(
        { mainproject: theme, user: email },
        { $set: { user: mem_name } }
      );

      const query8 = await Message.updateMany(
        { mainproject: theme, mem_name: mem_name },
        { $set: { mem_name: email } }
      );
      res.send('success');
    } catch (e) {
      console.log(e.message);
      res.status(400).json(e.message);
    }
  });

  return router;
};
