const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
const db = require('../database/db');

const verifyPassword = async (password, hashedPW) => {
  try {
    return await bcrypt.compare(password, hashedPW);
  } catch (err) {
    console.log(err);
  }
};

// with response, send user a cookie containing their user id
passport.serializeUser((user, done) => {
  try {
    return done(null, user._id);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

// upon recieving user id cookie, find user object in db and attach to req
passport.deserializeUser(async (id, done) => {
  const queryString = `
    SELECT
      _id, username, games, wins
    FROM 
      players
    WHERE
      players._id = $1
  `;
  try {
    const response = await db.query(queryString, [id]);
    const user = response.rows[0];
    return done(null, user);
  } catch (err) {
    console.log(err);
    return done(err);
  }
});

// define passport's first-party password strategy
passport.use(
  new LocalStrategy(async (username, password, done) => {
    const queryString = `
      SELECT
        _id, password
      FROM 
        players
      WHERE
        players.username = $1
    `;
    try {
      const response = await db.query(queryString, [username]);
      const user = response.rows[0];
      if (!user || !(await verifyPassword(password, user.password))) {
        return done(null, false);
      }
      return done(null, user);
    } catch (err) {
      console.log(err);
      return done(err);
    }
  })
);
