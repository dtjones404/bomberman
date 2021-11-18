const express = require('express');
const passport = require('passport');
const playerController = require('../controllers/playerController');

const router = express.Router();

router.post('/login', passport.authenticate('local'), (req, res) =>
  res.status(200).json({ msg: 'login successful' })
);

router.post(
  '/signup',
  playerController.getPlayer,
  playerController.createPlayer,
  (req, res) => res.status(201).json({ msg: 'signup successful' })
);

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/login');
});

module.exports = router;
