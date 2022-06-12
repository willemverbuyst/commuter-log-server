const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  userName: {
    type: String,
    required: ['true', 'User must have a username'],
    unique: true,
  },
  password: {
    type: String,
    required: ['true', 'User must have a username'],
  },
  email: String,
  meta: Object,
  deletedAt: Date,
  updatedAt: Date,
});
