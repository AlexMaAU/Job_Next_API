const mongoose = require('mongoose');

const connectToDB = async () => {
  if (!process.env.DB_CONNECT) {
    console.error('DB_CONNECT string is required');
    process.exit(1);
  }
  const db = mongoose.connection;
  db.on('error', (error) => {
    console.error(error);
    process.exit(2);
  });
  db.on('connected', () => {
    console.log('Connected to database');
  });
  db.on('disconnected', () => {
    console.log('Disconnected from database');
  });
  mongoose.connect(process.env.DB_CONNECT);
};

module.exports = connectToDB;
