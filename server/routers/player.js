const express = require('express');

const playerController = require('../controllers/playerController');

const router = express.Router();

router.get('/games', playerController.incrementGames, (req, res) =>
  res.status(200).json(res.locals.games)
);

router.get('/wins', playerController.incrementWins, (req, res) =>
  res.status(200).json(res.locals.wins)
);

router.get('/leaders', playerController.getLeaders, (req, res) =>
  res.status(200).json(res.locals.leaders)
);

router.get('/:username', playerController.getPlayer, (req, res) =>
  res.status(200).json(res.locals.player)
);

module.exports = router;
