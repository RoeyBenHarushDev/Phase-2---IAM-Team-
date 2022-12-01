const selectButton = document.getElementById("SelectButton");
const openRegisterForm = document.getElementById("SelectRegister");
const openLoginForm = document.getElementById("SelectLogin");
const loginForm = document.getElementById("LoginForm");
const registerForm = document.getElementById("RegisterForm");
const backLoginBtn = document.getElementById('backLoginBtn');
const backRegisterBtn = document.getElementById('backRegisterBtn');
const goRegister = document.getElementById('GoRegister');
const goLogin = document.getElementById('GoLogin');
const backForgotBtn = document.getElementById('backForgotBtn');
const forgotPasswordBtn = document.getElementById('forgotPassword');
const ForgotPasswordModel = document.getElementById('ForgotPasswordModel');
const VerifyByEmail = document.getElementById('VerifyByEmail');
const submitRegisterForm = document.getElementById('submitRegisterForm');

/*===========================mongoDB=========================*/
// const express = require("express");
// const path = require('path');
// const app =express();
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:/";

if(selectButton) {
    openLoginForm.addEventListener('click', () => {
        selectButton.style.display = "none";
        loginForm.style.display = "block"
    })

    openRegisterForm.addEventListener('click', () => {
        selectButton.style.display = "none";
        registerForm.style.display = "block";
    })

    backRegisterBtn.addEventListener('click', () => {
        registerForm.style.display = "none";
        loginForm.style.display = "none"
        selectButton.style.display = "block";

    })

    backLoginBtn.addEventListener('click', () => {
        registerForm.style.display = "none";
        loginForm.style.display = "none"
        selectButton.style.display = "block";
    })

    goLogin.addEventListener('click', () => {
        registerForm.style.display = "none";
        loginForm.style.display = "block";
    })

    goRegister.addEventListener('click', () => {
        loginForm.style.display = "none";
        registerForm.style.display = "block";
    })

    forgotPasswordBtn.addEventListener('click', () => {
        loginForm.style.display = "none";
        ForgotPasswordModel.style.display = 'block';
    })
    backForgotBtn.addEventListener('click', () => {
        ForgotPasswordModel.style.display = 'none';
        loginForm.style.display = "block";
    })
    submitRegisterForm.addEventListener('click', () => {
        registerForm.style.display = "none";
        VerifyByEmail.style.display = 'block';
    })
}
    /*=============================== create table with JSON file ====================================*/
const showUserBtn = document.getElementById("showUserBtn");
const showUser = document.getElementById("showUsers");
const addUserBtn = document.getElementById('addUserBtn');
const addUsers = document.getElementById('addUsers');
const backAddUsers = document.getElementById('backAddUsers');
const welcomeMessage = document.getElementById('welcomeMessage');
const backShowUsers = document.getElementById('backShowUsers');
const logOutBtn = document.getElementById('logOutBtn');

showUserBtn.addEventListener('click',  ()=>{
    addUsers.style.display = 'none';
    welcomeMessage.style.display = 'none';
    showUser.style.display = 'block';
})

addUserBtn.addEventListener('click',  ()=>{
    showUser.style.display = 'none';
    welcomeMessage.style.display = 'none';
    addUsers.style.display = 'block';
})
backAddUsers.addEventListener('click',  ()=>{
    addUsers.style.display = 'none';
    showUser.style.display = 'none';
    welcomeMessage.style.display = 'block';
})
backShowUsers.addEventListener('click',  ()=>{
    addUsers.style.display = 'none';
    showUser.style.display = 'none';
    welcomeMessage.style.display = 'block';
})
logOutBtn.addEventListener('click', ()=>{
    window.location.href = 'index.html';
})



fetch('./data/users.json')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });
function appendData(data) {
    const mainContainer = document.getElementById("myData");
    for (let i = 0; i < data.length; i++) {
        const li = document.createElement("li");
        li.classList.add("userRow");
        li.innerHTML = 'Name: ' + data[i].name + '&nbsp&nbsp&nbsp&nbsp&nbspEmail: ' + data[i].email + '&nbsp&nbsp&nbsp&nbsp&nbspType: ' + data[i].type +  '&nbsp&nbsp&nbsp&nbsp&nbspstatus: ' + data[i].status
            + '&nbsp&nbsp&nbsp&nbsp&nbsp<button class="removeUser"><span class="material-symbols-outlined" id="removeUser">\n' +
            'delete\n' +
            '</span></button>' + '<button class="editUser" id="{{$i}}"><span class="material-symbols-outlined" id="editUser">\n' +
            'edit_note\n' +
            '</span></button>';
        console.log(data);
        mainContainer.appendChild(li);
    }
}

//login


const sendLoginData = async () => {
    const data = {
        mail: document.getElementById("userEmail").value,
        pass: document.getElementById("userPass").value,
    };
    const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        body: JSON.stringify(data),
    });
    const handleResponse = {
        200: ({ location = "index.html" }) => {
            window.location.href = location;
        },
        401: () => {

            alert("Verification Error");
        },
        403:()=>
        {
            alert("user in suspention!");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
    }
};

//signup fetch

const sendSignUpData= async  () => {

    const data = {
        "name": document.getElementById("newUsername").value,
        "mail": document.getElementById("newUserEmail").value,
        "pass": document.getElementById("pass").value,
        // "rePass": document.getElementById("repass").value
    }
    await fetch("http://localhost:3000/api/signUp", {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            //console.log(response))
            // window.location.href=response.headers.Location;
            if (response.status === 401) {
                location.reload();
                alert("ERROR 401: Email already exists");
            }
        })
}



const forgotPassword= () => {
    const data = {
        "mail":document.getElementById("emailForgetPass").value,
    }
    fetch("http://localhost:3000/api/forgotPassword", {
        method: 'POST',
        body: JSON.stringify(data)
    })
        .then(response => {
            //console.log(response))
            // window.location.href=response.headers.Location;
            if (response.status===401){
                alert("email not found");
            }
        })
}


const emailConfirmation = async () => {
    const data = {
        "name":document.getElementById("newUsername").value,
        "mail":document.getElementById("newUserEmail").value,
        "pass": document.getElementById("pass").value,
        "code":document.getElementById("OTPtext").value
    };
    const response = await fetch("http://localhost:3000/api/confirm", {
        method: "POST",
        body: JSON.stringify(data),
    });

    const handleResponse = {
        200: ({ location = "index.html" }) => {
            window.location.href = location;
            alert("User was added")
        },
        403: () => {
            alert("OTP code is false");
        },
        401: () => {
            alert("Verification Error");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
    }
};

//LOGOUT & DELETING COOKIES

const userLogOut = document.getElementById('logOutBtn');
if(userLogOut){

    userLogOut.addEventListener('click', () =>{
        function get_cookie(name){
            return document.cookie.split(';').some(c => {
                return c.trim().startsWith(name + '=');
            });
        }

        function delete_cookie( name, path, domain ) {
            if( get_cookie( name ) ) {
                document.cookie = name + "=" +
                    ((path) ? ";path="+path:"")+
                    ((domain)?";domain="+domain:"") +
                    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        }
        window.location = "index.html";
    })
}



const suspension = async () => {
    const data = {
        "mail":document.getElementById("userEmail").value,
        "suspensionDate": document.getElementById("start").value,
    };
    const response = await fetch("http://localhost:3000/api/suspension", {
        method: "POST",
        body: JSON.stringify(data),
    });
}




// const el_up = document.getElementById("GFG_UP");
//
// const list = [
//     { "col_1": "val_11", "col_3": "val_13" },
//     { "col_2": "val_22", "col_3": "val_23" },
//     { "col_1": "val_31", "col_3": "val_33" }
// ];
//
// el_up.innerHTML = "Click on the button to create "
//     +   "the table from the JSON data.<br><br>"
//     + JSON.stringify(list[0]) + "<br>"
//     + JSON.stringify(list[1]) + "<br>"
//     + JSON.stringify(list[2]);
//
// function constructTable(selector) {
//     // Getting the all column names
//     let cols = Headers(list, selector);
//
//     // Traversing the JSON data
//     for (let i = 0; i < list.length; i++) {
//         let row = $('<tr/>');
//         for (let colIndex = 0; colIndex < cols.length; colIndex++)
//         {
//             let val = list[i][cols[colIndex]];
//
//             // If there is any key, which is matching
//             // with the column name
//             if (val == null) val = "";
//             row.append($('<td/>').html(val));
//         }
//
//         // Adding each row to the table
//         $(selector).append(row);
//     }
// }
//
// function Headers(list, selector) {
//     const columns = [];
//     const header = $('<tr/>');
//
//     for (let i = 0; i < list.length; i++) {
//         let row = list[i];
//
//         for (let k in row) {
//             if ($.inArray(k, columns) === -1) {
//                 columns.push(k);
//
//                 // Creating the header
//                 header.append($('<th/>').html(k));
//             }
//         }
//     }
//
//     // Appending the header to the table
//     $(selector).append(header);
//     return columns;
// }



/*=================================== create table with mongoDB==================================*/
// app.use(express.static('./public'));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//     extended: true
// }));
// app.post('/login',function(req,res){
//     let x=req.body.x;
//     let y=req.body.y;
//     let data={
//         "x_op":x,
//         "y_op":y
//     }
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         const dbo = db.db("mdb");
//         const myobj = { x: `${x}`, y: `${y}`};
//         dbo.collection("customers").insertOne(myobj, function(err, res) {
//             if (err) throw err;
//             console.log("1 document inserted");
//             db.close();
//         });
//     });
//     res.set({
//         'Access-Control-Allow-Origin' : '*'
//     });
//     res.send(JSON.stringify(data));
// });
// app.get('/tb',function(req,res){
//     let MongoClient = require('mongodb').MongoClient;
//     let url = "mongodb://localhost:27017/";
//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
//         let dbo = db.db("mydb");
//         dbo.collection("customers").find({}).toArray(function(err, result) {
//             if (err) throw err;
//             let obj = '$(result)';
//             for (let i = 0; i < obj.length; i++){
//                 app.locals.obj=result;
//                 db.close();
//             }
//         });
//     });
// });
