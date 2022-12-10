const dbHandler = require("../data/dbHandler");

async function ifClosed(user) {
    if (user.status === "closed") {
        throw new Error("user is closed");
    }
}

function changeUserStatus(user, action) {
    if (action.status == "suspended") {
            user.suspensionDate = new Date();
            user.suspensionTime = action.suspensionTime;
            user.status = "suspended";
    }
    if (action.status == "closed") {
        user.suspensionDate = new Date();
        user.suspensionTime = 0;
        user.status = "closed";
    }
    if (action.status == "active") {
        user.suspensionDate = 0;
        user.suspensionTime = 0;
        user.status = "active";
    }
    return user
}



module.exports= {changeUserStatus, ifClosed }