const dbHandler = require("../data/dbHandler");

async function ifClosed(userData) {
    const user = await dbHandler.getUserByEmail(userData.email);
    if (user.status === "closed") {
        throw new Error("user is closed");
    }
}

function changeUserStatus(userData) {
    let data;
    if (userData.userStatus == "suspended") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": userData.suspensionTime,
            "status": "suspended"
        }
    }
    if (userData.userStatus == "closed") {
        data = {
            "suspensionDate": new Date(),
            "suspensionTime": 0,
            "status": "closed"
        }
    }
    if (userData.userStatus == "active") {
        data = {
            "suspensionDate": 0,
            "suspensionTime": 0,
            "status": "active"
        }
    }
    return data
}



module.exports= {changeUserStatus, ifClosed }