const dbHandler = require("../data/dbHandler")
const mailerAPI = require('../growth/mailerAPI');


async function handleSuspend(request, response) {
    try {
        const user = request.body;
        await ifClosed(user);
        const data = changeUserStatus(user);
        await dbHandler.updateUser(user.email, data);
        // Growth team API(mailerAPI) - sending email after suspending a user.
        await mailerAPI.sendMail(user.email, 'suspend',' <h1>User suspended</h1>');
        return response.status(200);
    } catch (e) {
        return response.status(401).json({message: e.message})
    }
}

async function ifClosed(userData) {
    const user = await dbHandler.getUserByEmail(userData.email);
    if (user.status === "closed") {
        throw new Error("user is closed");
    }
}

function changeUserStatus(userData) {
    let data;
    if (userData.userStatus === "suspended") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": userData.suspensionTime,
            "status": "suspended"
        }
    }
    if (userData.userStatus === "closed") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": 0,
            "status": "closed"
        }
    }
    if (userData.userStatus === "active") {
        data = {
            "suspensionDate": 0,
            "suspensionTime": 0,
            "status": "active"
        }
    }
    return data
}

module.exports = {handleSuspend}



