const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  date: Date,
  statusOfDay: String,
  durationTrip: Number,
  meansOfTransport: String,
  startingPoint: String,
  destination: String,
  meta: Object,
  deletedAt: Date,
  updatedAt: Date,
});
