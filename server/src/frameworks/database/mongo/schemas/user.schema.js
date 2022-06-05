const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  userName: String,
  email: String,
  meta: Object,
  deletedAt: Date,
  updatedAt: Date,
});
