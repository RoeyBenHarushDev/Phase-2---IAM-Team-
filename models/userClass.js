const jwt = require("jsonwebtoken");
module.exports = class userClass {
    constructor(_id,type,email) {
        this._id=_id;
        this.type= type;
        this.email = email;
    }
}
