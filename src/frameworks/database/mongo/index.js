const mongoose = require('mongoose');
const schemas = require('./schemas');

const MONGO_IP = 'mongo';
const MONGO_PORT = 27017;

const DB_CONNECTION_STRING = `mongodb://${MONGO_IP}:${MONGO_PORT}`;

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
