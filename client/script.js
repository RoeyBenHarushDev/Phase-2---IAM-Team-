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
const SubmitLoginForm = document.getElementById('SubmitLoginForm');
const submitRegisterForm = document.getElementById('submitRegisterForm');
const SubmitEmailForm = document.getElementById('SubmitEmailForm');
const SubmitOTPForm = document.getElementById('SubmitOTPForm');
const sendStatus = document.getElementById('sendStatus');
const Password = document.getElementById("Password");
const CPassword = document.getElementById("C-Password");
const message = document.getElementById('message');
const googleLogIn = document.getElementById('googleLogIn');
const addUser = document.getElementById('addUser');
// const host = process..env.clientHost || 'http://localhost:5000';
const host = window.location.origin
/*===========================mongoDB=========================*/
// const express = require("express");
// const path = require('path');
// const app =express();
// const bodyParser = require('body-parser');
// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb://localhost:/";

if (selectButton) {
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
    googleLogIn.addEventListener('click', () => {
        window.location.href = `${host}/api/googleLogIn`;
    })
    SubmitLoginForm.addEventListener('click', () => {
        LoginData();
    })
    SubmitEmailForm.addEventListener('click', () => {
        forgotPassword();
    })
    SubmitOTPForm.addEventListener('click', () => {
        clearInterval(timer);
        emailConfirmation();
    })

    let timer

    submitRegisterForm.addEventListener('click', async () => {
        if ((Password.value === CPassword.value) && (Password.value !== '' && CPassword.value !== '')) {
            registerForm.style.display = "none";
            VerifyByEmail.style.display = 'block';
            timer = setInterval(async function () {
                const data = {
                    email: document.getElementById("Email").value,
                }
                const response = await fetch(host + '/api/deleteAfter15', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                const body = await response.json();
                if (body.message) {
                    alert((body.message));
                    location.reload();
                }
            }, 900000)
            await signupData();
            return true;

        } else {
            alert("Please check if :\n\n1. You fill out all the fields\n2. Password isn't empty!\n3. Password are the Same!");
            return false;
        }
    })


    Password && CPassword.addEventListener('keyup', () => {
        if (Password.value !== CPassword.value) {
            message.innerHTML = "Not Matching";
            message.style.color = "red";
        } else {
            message.innerHTML = "Matching";
            message.style.color = "green";
        }
    })

}
// editUser
/*=============================== create table with JSON file ====================================*/
const showUserBtn = document.getElementById("showUserBtn");
const showUser = document.getElementById("showUsers");
const addUserBtn = document.getElementById('addUserBtn');
const addUsers = document.getElementById('addUsers');
const backAddUsers = document.getElementById('backAddUsers');
const welcomeMessage = document.getElementById('welcomeMessage');
const backShowUsers = document.getElementById('backShowUsers');
const logOutBtn = document.getElementById('logOutBtn');
const userStatusModel = document.getElementById('userStatusModel');
const userDetailsModel = document.getElementById('userDetailsModel');
// const userForm = document.getElementById('userForm');


if (showUserBtn) {
    showUserBtn.addEventListener('click', () => {
        addUsers.style.display = 'none';
        welcomeMessage.style.display = 'none';
        userStatusModel.style.display = 'none';
        userDetailsModel.style.display = 'none';
        showUser.style.display = 'block';
        appendData();
    })

    addUserBtn.addEventListener('click', () => {
        showUser.style.display = 'none';
        welcomeMessage.style.display = 'none';
        userStatusModel.style.display = 'none';
        userDetailsModel.style.display = 'none';
        addUsers.style.display = 'block';
    })
    backAddUsers.addEventListener('click', () => {
        addUsers.style.display = 'none';
        showUser.style.display = 'none';
        userStatusModel.style.display = "none";
        userDetailsModel.style.display = 'none';
        welcomeMessage.style.display = 'block';
    })
    backShowUsers.addEventListener('click', () => {
        addUsers.style.display = 'none';
        showUser.style.display = 'none';
        userStatusModel.style.display = "none";
        userDetailsModel.style.display = 'none';
        welcomeMessage.style.display = 'block';
    })
    logOutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
    sendStatus.addEventListener('click', () => {
        suspension();
    })
    addUser.addEventListener('click', () => {
        addUserData();
    })

    async function appendData() {
        const response = await fetch(`${host}/api/admin/showUser`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tbody = document.createElement('tbody');
        const userTitle = document.createElement('tr');
        const nameHeading = document.createElement('th');
        nameHeading.innerHTML = "Name";
        const emailHeading = document.createElement('th');
        emailHeading.innerHTML = "E-mail";
        const typeHeading = document.createElement('th');
        typeHeading.innerHTML = "Type";
        const statusHeading = document.createElement('th');
        statusHeading.innerHTML = "Status";


        table.appendChild(thead);
        table.appendChild(tbody);

// Adding the entire table to the body tag
        const myData = document.getElementById("myData").appendChild(table);


        userTitle.appendChild(nameHeading);
        userTitle.appendChild(emailHeading);
        userTitle.appendChild(typeHeading);
        userTitle.appendChild(statusHeading);
        thead.appendChild(userTitle);

        const userDbBtn = document.createElement('button');
        for (let i = 0; i < data.length; i++) {

            const userDbBtn = document.createElement('button');
            let userDb = myData.insertRow(i);
            userDbBtn.classList.add("userDbBtn");
            userDbBtn.setAttribute('id', data[i].email);
            userDbBtn.setAttribute('type', "button");
            const userEmail = data[i].email;

            let userDbRow_1 = document.createElement('td');
            userDbRow_1.innerHTML = data[i].name;
            let userDbRow_2 = document.createElement('td');
            userDbRow_2.innerHTML = data[i].email;
            let userDbRow_3 = document.createElement('td');
            userDbRow_3.innerHTML = data[i].type;
            let userDbRow_4 = document.createElement('td');
            userDbRow_4.innerHTML = data[i].status;
            userDbBtn.innerHTML = "Show User";

            userDb.appendChild(userDbRow_1);
            userDb.appendChild(userDbRow_2);
            userDb.appendChild(userDbRow_3);
            userDb.appendChild(userDbRow_4);
            userDb.appendChild(userDbBtn);
            tbody.appendChild(userDb);
        }

        const showUserToEdit = document.querySelectorAll('.userDbBtn');
        for (let i = 0; i < data.length; i++) {
            showUserToEdit[i].addEventListener('click', () => {
                    addUsers.style.display = 'none';
                    showUser.style.display = 'none';
                    userStatusModel.style.display = "none";
                    userDetailsModel.style.display = 'block';
            })
        }
    }
}

const backStatusUsers = document.getElementById('backStatusUsers');
if(backStatusUsers){
    backStatusUsers.addEventListener('click', ()=>{
        addUsers.style.display = 'none';
        userStatusModel.style.display = "none";
        userDetailsModel.style.display = 'none';
        showUser.style.display = 'block';
    })
}

// const myData = document.getElementById('myData');


const editUser = document.getElementById('editUser');
if (editUser) {
    editUser.addEventListener('click', () => {
        document.getElementById('userNameDetails').readOnly = false;
        document.getElementById('userPasswordDetails').readOnly = false;
        document.getElementById('userPermissions').readOnly = false;
    })
}

const changeStatus = document.getElementById('changeStatus');
if(changeStatus){
    changeStatus.addEventListener('click', ()=>{
        addUsers.style.display = 'none';
        showUser.style.display = 'none';
        userStatusModel.style.display = "none";
        userDetailsModel.style.display = 'none';
        userStatusModel.style.display = 'block';
    })
}
const backDetailsUsers = document.getElementById('backDetailsUsers');
if(backDetailsUsers){
    backDetailsUsers.addEventListener('click', ()=>{
        addUsers.style.display = 'none';
        userStatusModel.style.display = "none";
        userDetailsModel.style.display = 'none';
        userStatusModel.style.display = 'none';
        showUser.style.display = 'block';
    })
}

//login


const LoginData = async () => {
    const data = {
        email: document.getElementById("L-Email").value,
        password: document.getElementById("L-Password").value,
    };
    const response = await fetch(`${host}/api/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    if (response.status === 200) {
        location = "homePage.html";
        window.location.href = "homePage.html";
    }
    const body = await response.json();
    if (body.message) {
        alert((body.message));
        // location.reload();
    }
};

//signup fetch

const signupData = async () => {
    const data = {
        name: document.getElementById("Username").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("C-Password").value,
    }
    const response = await fetch(host + '/api/signUp', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    })
    const body = await response.json();
    if (body.message) {
        alert((body.message));
        location.reload();
    }
}


const forgotPassword = async () => {
    const data = {
        "email": document.getElementById("forgotEmail").value,
    }
    const response = await fetch(`${host}/api/forgotPassword`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (body.message) {
        alert((body.message));
        location.reload();
    }
}

const emailConfirmation = async () => {
    const data = {
        name: document.getElementById("Username").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("C-Password").value,
        code: document.getElementById("VerifyOTP").value
    };
    const response = await fetch(`${host}/api/confirmCode`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const body = await response.json();
    if (body.message) {
        alert((body.message));
        location.reload();
    }
};

// const changePassword = async () => {
//     const data = {
//         "email": document.getElementById("forgotEmail").value,
//     }
//     const response = await fetch("http://localhost:3000/api/changePassword", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify(data),
//     });
//     const handleResponse = {
//         200:
//             () => {
//                 location.reload();
//                 alert("A new password has been sent to the email");
//             },
//         403:
//             () => {
//                 location.reload();
//                 alert("Email does not exist");
//             },
//     };
// }

//LOGOUT & DELETING COOKIES

const userLogOut = document.getElementById('logOutBtn');
if (userLogOut) {

    userLogOut.addEventListener('click', () => {
        function get_cookie(name) {
            return document.cookie.split(';').some(c => {
                return c.trim().startsWith(name + '=');
            });
        }

        function delete_cookie(name, path, domain) {
            if (get_cookie(name)) {
                document.cookie = name + "=" +
                    ((path) ? ";path=" + path : "") +
                    ((domain) ? ";domain=" + domain : "") +
                    ";expires=Thu, 01 Jan 1970 00:00:01 GMT";
            }
        }

        window.location = "index.html";
    })
}


const suspension = async () => {
    const suspendedBut = document.querySelector('input[name="userStatus"]:checked').value;
    let suspensionTime = 0
    if (suspendedBut === "suspended") {
        suspensionTime = document.getElementById("start").value
    }
    const data = {
        "email": document.getElementById("userChangeEmail").value,
        "suspensionTime": suspensionTime,
        "userStatus": suspendedBut
    };
    const response = await fetch(`${host}/api/admin/suspension`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (body.message) {
        alert((body.message));
    }
};

function openDateForm() {
    let checkRadio = document.querySelector(
        'input[name="userStatus"]:checked');

    if (checkRadio.value === "suspended") {
        document.getElementById("disp").innerHTML = checkRadio.value + " button checked" + `<br><input type="number" id="start" name="trip-start"
        value="1"
        min="0">`;
    } else if (checkRadio.value !== "suspended") {
        document.getElementById("disp").innerHTML = checkRadio.value + " button checked"
    } else {
        document.getElementById("disp").innerHTML
            = "No one selected";
    }
}

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
const addUserData = async () => {
    const data = {
        name: document.getElementById("userFullName").value,
        email: document.getElementById("userEmail").value,
        password: document.getElementById("userPassword").value
    };
    const response = await fetch(`${host}/api/admin/addUser`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    const body = await response.json();
    if (body.message) {
        alert((body.message));
    }
};

