const db = require('./server/database/db');

module.exports = async () => {
  db.end();
};
