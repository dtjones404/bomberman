const path = require('path');
const express = require('express');

const passport = require('passport');
const cookieSession = require('cookie-session');
require('./config/passport');

const app = express();

// import routers
const playerRouter = require('./routers/player');
const authRouter = require('./routers/auth');

// utility middleware
app.use(express.json());
app.use(express.static(path.resolve(__dirname, '../dist')));

// enable sessions using passport.js middleware
app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_KEY],
    httpOnly: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// use routers
app.use('/api/player', playerRouter);
app.use('/api/auth', authRouter);

// serve index
app.get('/', (req, res) => {
  res.status(200).sendFile(path.join(__dirname, '../dist/index.html'));
});

// 404 handler
app.use((req, res) => res.status(404).send('Page not found!'));

// global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

module.exports = app;
