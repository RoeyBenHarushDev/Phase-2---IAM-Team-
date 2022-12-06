const User = require('../models/users');

const getUserByEmail= async (mail) =>{
    return User.findOne({email: mail});
}

async function updateUser(mail, params) {
    const filter = {email: mail};
    const update = params;
    await User.findOneAndUpdate(filter, update);
}

async function addDoc(obj) {
    const result = await obj.save();
    console.log("res "+result);
    if (result) {
        console.log("new user was added");
    } else {
        throw new Error("Error while saving new user");
    }
}

function typeUser(user) {
    let domain = user.email.split("@");
    domain = domain[1].split(".");
    console.log(domain)
    if (domain[0] == "shenkar") {
        return "admin"
    } else {
        return "user"
    }
}

module.exports = {getUserByEmail, updateUser, addDoc, typeUser};
