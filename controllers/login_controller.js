const bcrypt = require('bcrypt');
const users= require('../data/users.json');


const getUserByEmail = (email)=>{
    const user = users.find(user => user.email === email);
    return user ? user : "User does'nt exist";
}

function isAfter(date1, date2) {
    return date1 > date2;
}

const isSuspend = (user)=> {
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

module.exports = {getUserByEmail,isSuspend}




/*const usrs = require('cata/users.json');*/
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

