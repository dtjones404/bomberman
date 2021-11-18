const { Pool } = require('pg');

const PG_URI = (process.env.NODE_ENV = 'production'
  ? process.env.DATABASE_URI
  : process.env.DEV_DATABASE_URI);

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI,
});

module.exports = pool;
