const User = require('../models/users');
const bcrypt = require("bcrypt");


const getUserByEmail = async (mail) => {
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

function typeUser(user) {
    let domain = user.email.split("@");
    domain = domain[1].split(".");
    if (domain.find(element => element === "shenkar")) {
        return "admin"
    } else {
        return "user"
    }
}

 const addUser= async (user) => {
    if (user.password){
        user.password = await bcrypt.hash(user.password, 12);}
    const domain = typeUser(user)
    const newUser = new User({
        "name": user.name,
        "email": user.email,
        "password": user.password,
        "type": domain});
    await addDoc(newUser);
}


module.exports = {getUserByEmail, updateUser, addDoc, addUser};
