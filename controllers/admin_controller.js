const dbHandler = require("../data/dbHandler")
const adminService = require("../services/adminService");

async function handleSuspend(req, res) {
    try {
        const user = req.body;
        await adminService.ifClosed(user);
        const data = adminService.changeUserStatus(user);
        await dbHandler.updateUser(user.email, data);

       return  res.status(200).json({message: "User status update"});
    } catch (error) {
        return res.status(401).json({message: error.message });
    }
}

async function handleAddUser(req, res) {
    try {
        if (!req.body) throw new Error("Email is required")
        let newUser = req.body;
        newUser.email = newUser.email.toLowerCase();

        const user = await dbHandler.getUserByEmail(newUser.email);
        if (user)
            throw new Error("user already exists")
        await dbHandler.addUser(newUser)
      return   res.status(200).json({ message: "user is closed" });
    } catch (error) {
       return  res.status(401).json({ message: error.message })
    }
}

async function handleShowUser(req, res) {
    const showAllUser = await dbHandler.showAll();
    return res.send(JSON.stringify(showAllUser));
}

async function handleDeleteUser(req, res) {
    const user = await dbHandler.getUserByEmail(req.body.email);
    if (user) {
        await dbHandler.deleteUser(user.email);
       return  res.status(200).json({ message: "The user has been deleted" })
    }
}

module.exports = {handleSuspend, handleAddUser, handleShowUser, handleDeleteUser}



