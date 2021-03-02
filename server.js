const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const session = require('express-session');
require('dotenv').config();
const app = express();
const userController = require('./controllers/users.js');
const sessionsController = require('./controllers/sessions.js');
const homeController = require('./controllers/home.js');

/// Configuration ///
const PORT = process.env.PORT || 8888;
const mongoURI =
  process.env.MONGODB_URI || 'mongodb://localhost:27017/smart_home';

/// Middleware ///
app.use(express.static('public'));
// allows us to use put and delete methods
app.use(methodOverride('_method'));
// parses info from our input fields into an object
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
  }),
);

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next();
  } else {
    res.redirect('/sessions/new');
  }
};

/// Database ///
mongoose.connect(mongoURI, { useNewUrlParser: true });
mongoose.connection.once('open', () => {
  console.log('connected to mongo');
});

app.use('/users', userController);
app.use('/sessions', sessionsController);
app.use('/home', homeController);

/// Listen ///
app.listen(PORT, () => console.log('smart home happening on port', PORT));

/// Routes ///
app.get('/', (req, res) => {
  res.render('index.ejs', {
    currentUser: req.session.currentUser,
  });
});

app.get('/home', isAuthenticated, (req, res) => {
  res.render('home/index.ejs');
});
