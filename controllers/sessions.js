const express = require('express');
const sessions = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/users.js');

sessions.get('/new', (req, res) => {
  res.render('sessions/new.ejs');
});

sessions.post('/', (req, res) => {
  User.findOne({ username: req.body.username }, (err, foundUser) => {
    // if db error handle the db error
    if (err) {
      console.log(err);
      res.send('oops something went wrong');
      // if user not found, handle the error
    } else if (!foundUser) {
      res.send('<a href="/sessions/new"><button>user not found!</button></a>');
    } else {
      if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        req.session.currentUser = foundUser;
        res.redirect('/smart_home');
        // if passwords don't match, handle the error
      } else {
        res.send('<a href="/sessions/new"><button>wrong password</button></a>');
      }
    }
  });
});

sessions.delete('/', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/smart_home');
  });
});
module.exports = sessions;
