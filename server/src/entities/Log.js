module.exports.Log = class Log {
  constructor({
    id,
    userId = null,
    weekNumber = null,
    date = null,
    statusOfDay = null,
    durationTrip = null,
    meansOfTransport = null,
    startingPoint = null,
    destination = null,
    meta = {},
  }) {
    this.id = id;
    this.weekNumber = weekNumber;
    this.userId = userId;
    this.date = date;
    this.statusOfDay = statusOfDay;
    this.durationTrip = durationTrip;
    this.meansOfTransport = meansOfTransport;
    this.startingPoint = startingPoint;
    this.destination = destination;
    this.meta = meta;
  }
};

const meansOfTransport = {
  CAR: 'CAR',
  PUBLIC_TRANSPORT: 'PUBLIC_TRANSPORT',
  NONE: 'NONE',
};

const statusOfDay = {
  DAY_OFF: 'DAY_OFF',
  WORKING_AT_THE_OFFICE: 'WORKING_AT_THE_OFFICE',
  WORKING_FROM_HOME: 'WORKING_FROM_HOME',
};

module.exports.logConstants = { meansOfTransport, statusOfDay };
