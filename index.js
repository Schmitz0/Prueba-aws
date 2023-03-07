require('dotenv').config();
const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const Supplies = require('./src/db.js');
const Bills = require('./src/db.js')
const { PORT } = process.env;

conn.sync({ force: true }).then(() => {
  server.listen(PORT, () => {
    console.log(`Server running...`); 
  });
});


