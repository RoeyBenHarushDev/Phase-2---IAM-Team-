const bcrypt = require('bcrypt');
const dbHandler = require('../data/dbHandler');
function isSuspend(user){
    if (user.suspensionTime == '0' && user.suspensionDate == 'null' && user.status != 'suspended') {
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
    }
}


const handleLogin = async (req,res,next)=>{
/*    console.log("loginHandle1")
    res.writeHead(200,{'Access-Control-Allow-Origin':'*'})*/
    const userEmail=req.body.email;
    const userPassword=req.body.password;
    console.log(userPassword,userPassword);
    const user = getUserByEmail(userEmail) //maybe needs await in the start and in the end.lean()
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid username/password' })
    }
    const suspend = isSuspend(user);
    if(suspend){
        return res.json({ status: 'error', error: `User is suspended until ${isSuspend}`})
    }
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
        console.log("loginHandle")
        return res.redirect(200,"/api/login/home"); //doesnt work
    }
    else return res.json({status: 'error', error: 'Invalid password'})
}


function isAfter(date1, date2) {
    return date1 > date2;
}

module.exports = {getUserByEmail,isSuspend,handleLogin}




/*const usrs = require('data/users.json');*/
/*const validateUser = (req,res) => {
    try {
        const user = getUserByEmail(req.body.email);
        if (user==null){
            throw new ReferenceError('No user with that mail');
        }
        //const hashedPass = bcrypt.hash(req.body.password,10);
        if (await bcrypt.compare(req.body.password,user.password)){

        }else {
            throw new Error('Incorrect password');
        }

    } catch(e){
        console.log(e.message);
    }
}*/

