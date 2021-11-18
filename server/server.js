require('dotenv').config();

const app = require('./app');

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});
