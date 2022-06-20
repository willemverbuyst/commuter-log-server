const mongoose = require('mongoose');

const { ObjectId, Schema } = mongoose;

module.exports = new Schema({
  date: Date,
  userId: ObjectId,
  statusOfDay: String,
  durationTrip: Number,
  meansOfTransport: String,
  startingPoint: String,
  destination: String,
  meta: Object,
  deletedAt: Date,
  updatedAt: Date,
});
