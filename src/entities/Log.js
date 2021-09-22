module.exports.Log = class Log {
  constructor({
    id,
    date = null,
    durationTrip = null,
    meansOfTransport = null,
    startingPoint = null,
    destination = null,
    meta = {},
  }) {
    this.id = id;
    this.date = date;
    this.durationTrip = durationTrip;
    this.meansOfTransport = meansOfTransport;
    this.startingPoint = startingPoint;
    this.destination = destination;
    this.meta = meta;
  }
};
