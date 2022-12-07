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
        if (!req.body) throw new Error("no email")
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

            const user = await dbHandler.getUserByEmail(newUser.email);
        if (user)
            throw new Error("user already exists")
        await dbHandler.addUser(newUser)
        return constructResponse(res, {}, 200);
    } catch (e) {
        if(e.message === "no email") res.status
        return constructResponse(res, {}, 401);
    }
}

async function handleShowUser(req, res) {
    const showAllUser = await dbHandler.showAll();
    const a =JSON.stringify(showAllUser)
    res.send(a);
}

async function handleDeleteUser(req, res) {
    const user = await dbHandler.getUserByEmail(req.body.email);
    if (user) {
        await dbHandler.deleteUser(user.email);
    }
}

module.exports = {handleSuspend, handleAddUser, handleShowUser, handleDeleteUser}



