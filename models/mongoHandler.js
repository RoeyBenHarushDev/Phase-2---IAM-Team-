const users = require('./users');


const getUserByEmail = (mail) => {
    return users.find({email: mail});
}

// Update user from JSON
async function updateUser(mail, params) {
    const filter = {email: mail};
    const update = params;
    await users.findOneAndUpdate(filter, update, {new: true});
}

const addUser = (new_user) => {
    try {
        let json
        let obj = {
            name: new_user.name,
            email: new_user.email,
            password: new_user.password,
            loginDate: new_user.loginDate,
            type: new_user.type,
            status: new_user.status,
            suspensionTime: new_user.suspensionTime,
            suspensionDate: new_user.suspensionDate
        }
        userJson.push(obj)

        json = JSON.stringify(userJson)
        fs.writeFile(process.cwd() + "/data/users.json", json, 'utf-8', callback => {
            // server.logger.log("wrote file successfully")
        })
    } catch (err) {
        console.error({err});
    }
}

module.exports = {getUserByEmail, updateUser, addUser};