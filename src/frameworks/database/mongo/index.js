const mongoose = require('mongoose');
const schemas = require('./schemas');

const MONGO_IP = 'mongo';
const MONGO_PORT = 27017;
const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASSWORD = process.env.MONGO_PASSWORD;

const DB_CONNECTION_STRING = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin`;

module.exports = {
  connect: () => {
    mongoose.connect(DB_CONNECTION_STRING);

    const db = mongoose.connection;
    db.on(
      'error',
      console.error.bind(console, 'Connection to mongo has failed!'),
    );
    db.once('open', () => {
      console.log('Succesfully connected to mongo db cluster');
    });
  },
  schemas,
};
