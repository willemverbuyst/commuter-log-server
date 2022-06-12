module.exports.User = class User {
  constructor({
    id,
    userName = null,
    password = null,
    email = null,
    meta = {},
  }) {
    this.id = id;
    this.userName = userName;
    this.password = password;
    this.email = email;
    this.meta = meta;
  }
};
