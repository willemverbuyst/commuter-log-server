module.exports.Log = class Log {
  constructor({
    id,
    date = null,
    statusOfDay = null,
    durationTrip = null,
    meansOfTransport = null,
    startingPoint = null,
    destination = null,
    meta = {},
  }) {
    this.id = id;
    this.date = date;
    this.statusOfDay = statusOfDay;
    this.durationTrip = durationTrip;
    this.meansOfTransport = meansOfTransport;
    this.startingPoint = startingPoint;
    this.destination = destination;
    this.meta = meta;
  }
};

const meansOfTransport = { CAR: 0, PUBLIC_TRANSPORT: 1, NONE: 2 };

const statusOfDay = {
  DAY_OFF: 0,
  WORKING_AT_THE_OFFICE: 1,
  WORKING_FROM_HOME: 2,
};

module.exports.logConstants = { meansOfTransport, statusOfDay };
