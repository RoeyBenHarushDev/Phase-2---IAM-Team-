const dbHandler = require("../data/dbHandler")
const {constructResponse} = require('../utils/utils');
const adminService = require("../services/adminService");

async function handleSuspend(request, response) {
    try {
        const user = request.body;
        await adminService.ifClosed(user);
        const data = adminService.changeUserStatus(user);
        await dbHandler.updateUser(user.email, data);

        return constructResponse(response, {}, 200);
    } catch (e) {
        if (e.message === 'user is closed') {
            return constructResponse(response, {error: e.message}, 403);
        }
        return constructResponse(response, {error: e.message}, 401);
    }
}

async function handleAddUser(req, res) {
    try {
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

        const user = await dbHandler.getUserByEmail(newUser.email);
        if (user) {
            throw new Error("user already exists")
        }
        await dbHandler.addUser(newUser)
        return constructResponse(res, {}, 200);
    } catch (e) {
        return constructResponse(res, {}, 401);
    }
}
async function handleShowUser(req, res) {

}


module.exports = {handleSuspend, handleAddUser, handleShowUser}



