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
    if (result) {
        return;
    } else {
        throw new Error("Error while saving new object");
    }
}

module.exports = {getUserByEmail, updateUser, addDoc};
