module.exports.User = class User {
  constructor({ id, userName = null, email = null, meta = {} }) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.meta = meta;
  }
};
