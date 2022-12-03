const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');
const {constructResponse} = require('../utils/utils.js');

const unSuspend= (user)=>{
    dbHandler.updateUser(user.email,{"status":"active","suspensionTime":"0","suspen  sionDate":"null"});
}

function isSuspend(user){
    if (user.suspensionTime === '0' && user.suspensionDate === 'null' && user.status === 'active') {
        console.log(`user: ${user["email"]} is not suspended`);
        return 0;
    }
    const today = new Date();
    const suspendTime = user.suspensionTime;
    const suspendStartDate = user.suspensionDate;
    const isSuspend = isAfter(suspendStartDate + parseInt(suspendTime), today);
    if (isSuspend) {
        console.log(`user: ${user["email"]} is suspended- login failed`, 'ERROR');
        return suspendStartDate + parseInt(suspendTime);
    }else {
        unSuspend(user);
        console.log(`user: ${user["email"]} is no longer suspended`);
        return 0;
    };
}

const handleLogin = async (req,res,next)=>{
    const userEmail=req.body.email;
    const userPassword=req.body.password;

    const user = dbHandler.getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
    if (!user) {
        return constructResponse(res, {error: 'Invalid username/password'}, 401);}

    const suspend = isSuspend(user);
    if(suspend){
        return constructResponse(res, {error: `User is suspended until ${isSuspend}`}, 401);}
    if (await bcrypt.compare(userPassword, user.password)) {
        /*password is correct
        const token = 1;
                    jwt.sign(
        {
            id: user._id,
                username: user.username
        },
        JWT_SECRET
    )
        return res.json({ status: 'ok', data: token })
        */
        //return res.json({status: 'ok'}); //works
        // return res.send('/home') // works

        const today=new Date();
        dbHandler.updateUser(userEmail,{"loginDate":today.toString()})
        return constructResponse(res, {}, 200);
        //return res.redirect(200,"/api/login/homePage.html"); //doesnt work
    }
    return constructResponse(res, {error: 'Invalid password'}, 401);
}


function isAfter(date1, date2) {
    return date1 > date2;
}

module.exports = {handleLogin}
