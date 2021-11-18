const bcrypt = require('bcrypt');
const db = require('../database/db');

const playerController = {};

playerController.getPlayer = async (req, res, next) => {
  const queryString = `
    SELECT 
      username, games, wins 
    FROM 
      players 
    WHERE 
      players.username = $1;
  `;

  try {
    const response = await db.query(queryString, [
      req.body.username || req.params.username,
    ]);
    res.locals.player = response.rows[0];
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.getPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.createPlayer = async (req, res, next) => {
  const queryString = `
    INSERT INTO 
      players 
      (username, password) 
    VALUES 
      ($1, $2);
  `;

  try {
    // if username already exists, return 400
    if (res.locals.player) {
      return next({
        status: 400,
        log: `ERROR in playerController.createPlayer: user already exists`,
        message: { err: 'A user with that name already exists' },
      });
    }

    const { username, password } = req.body;
    const hashedPW = await bcrypt.hash(password, 12);
    await db.query(queryString, [username, hashedPW]);
    res.locals.player = { username };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.createPlayer: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.incrementGames = async (req, res, next) => {
  const queryString = `
    UPDATE
      players 
    SET
      games = $1
    WHERE
      players._id = $2;
  `;

  try {
    await db.query(queryString, [+req.user.games + 1, req.user._id]);
    res.locals.games = { games: +req.user.games + 1 };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.incrementGames: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.incrementWins = async (req, res, next) => {
  const queryString = `
    UPDATE
      players 
    SET
      wins = $1
    WHERE
      players._id = $2;
  `;

  try {
    await db.query(queryString, [+req.user.wins + 1, req.user._id]);
    res.locals.wins = { wins: +req.user.wins + 1 };
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.incrementWins: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

playerController.getLeaders = async (req, res, next) => {
  const queryString = `
    SELECT 
      username, games, wins 
    FROM 
      players 
    ORDER BY 
      wins DESC 
    LIMIT 
      10
  `;

  try {
    const response = await db.query(queryString);
    res.locals.leaders = response.rows;
    return next();
  } catch (err) {
    return next({
      log: `ERROR in playerController.getLeaders: ${err}`,
      message: { err: 'An error occurred' },
    });
  }
};

module.exports = playerController;
