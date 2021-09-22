const mongoose = require('mongoose');

const { Schema } = mongoose;

module.exports = new Schema({
  date: Date,
  statusOfDay: Number,
  durationTrip: Number,
  meansOfTransport: Number,
  startingPoint: String,
  destination: String,
  meta: Object,
  deletedAt: Date,
  updatedAt: Date,
});
