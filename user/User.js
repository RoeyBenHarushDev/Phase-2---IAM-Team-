const { appendFileSync } = require("fs");
const path = require("path");
const userJson = require("../data/users.json");
const JSON = require("JSON");
const fs = require('fs');

module.exports = class User {
  constructor(
      name,
      email,
      password,
      loginDate = new Date(),
      suspensionDate = "null",
      suspensionTime = "0",
      status = "active",
      type= "user"
  ) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.loginDate = loginDate;
    this.type= type;
    this.status = status;
    this.suspensionTime = suspensionTime;
    this.suspensionDate = suspensionDate;
  }
};
