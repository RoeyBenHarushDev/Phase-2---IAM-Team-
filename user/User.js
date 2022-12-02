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
      suspensionDate = null,
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

  toJsonRow(new_user) {
    try {
      let json
      let obj = {name: new_user.name,
        email: new_user.email,
        password: new_user.password,
        loginDate: new_user.loginDate,
        type: new_user.status,
        status: new_user.type,
        suspensionTime: new_user.suspensionTime,
        suspensionDate: new_user.suspensionDate}

      // console.log({ new_user });

      userJson.push(obj)

      json = JSON.stringify(userJson)
      fs.writeFile(process.cwd() + "/data/users.json", json, 'utf-8', callback => {
        // server.logger.log("wrote file successfully")
      })
    } catch (err) {
      console.error({ err });
    }
  }

};
