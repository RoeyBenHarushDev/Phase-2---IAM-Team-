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
// const host = process.env.clientHost || 'http://localhost:5000';
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
        emailConfirmation();
    })
    submitRegisterForm.addEventListener('click', async () => {
        if ((Password.value === CPassword.value) && (Password.value !== '' && CPassword.value !== '')) {
            registerForm.style.display = "none";
            VerifyByEmail.style.display = 'block';
            try {
                await signupData();
                return true;
            } catch (err) {
                console.log(err)
            }
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
// const userForm = document.getElementById('userForm');


if (showUserBtn) {
    showUserBtn.addEventListener('click', () => {
        addUsers.style.display = 'none';
        welcomeMessage.style.display = 'none';
        userStatusModel.style.display = 'none';
        showUser.style.display = 'block';
    })

    addUserBtn.addEventListener('click', () => {
        showUser.style.display = 'none';
        welcomeMessage.style.display = 'none';
        userStatusModel.style.display = 'none';
        addUsers.style.display = 'block';
    })
    backAddUsers.addEventListener('click', () => {
        addUsers.style.display = 'none';
        showUser.style.display = 'none';
        userStatusModel.style.display = "none";
        welcomeMessage.style.display = 'block';
    })
    backShowUsers.addEventListener('click', () => {
        addUsers.style.display = 'none';
        showUser.style.display = 'none';
        userStatusModel.style.display = "none";
        welcomeMessage.style.display = 'block';
    })
    logOutBtn.addEventListener('click', () => {
        window.location.href = 'index.html';
    })
    sendStatus.addEventListener('click', () => {
        suspension();
    })


    /*    fetch('../data/users.json')
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                appendData(data);
            })
            .catch(function (err) {
                console.log('error: ' + err);
            });*/

    function appendData(data) {
        const mainContainer = document.getElementById("myData");
        const listOfUser = document.getElementById('listOfUser');
        const removeUser = document.getElementById('removeUser');
        const editUser = document.getElementById('editUser');
        for (let i = 0; i < data.length; i++) {
            const li = document.createElement("li");
            li.classList.add("userRow");
            li.setAttribute('id', "" + (i + 1));
            li.innerHTML = 'Name: ' + data[i].name + '&nbsp&nbsp&nbsp&nbsp&nbspEmail: ' + data[i].email + '&nbsp&nbsp&nbsp&nbsp&nbspType: ' + data[i].type + '&nbsp&nbsp&nbsp&nbsp&nbspStatus: ' + data[i].status
                + '&nbsp&nbsp&nbsp&nbsp&nbsp' + '<div class="REBtns"><button class="removeUser" id="removeUser"><span class="material-symbols-outlined">delete</span></button>'
                + '<button class="editUser" id="editUser"><span class="material-symbols-outlined">edit_note</span></button></div>';
            console.log(data);
            mainContainer.appendChild(listOfUser);
            listOfUser.appendChild(li);
        }
    }
}
const editUser = document.getElementById('editUser');
if (editUser) {
    editUser.addEventListener('click', () => {
        showUser.style.display = 'none';
        userStatusModel.style.display = 'block';
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
    const handleResponse = {
        200:
            ({location = "homePage.html"}) => {
                window.location.href = location;
            },
        401: () => {
            alert(response.status + ": " + response.statusText + ": Incorrect password or user");
        },
        403: () => {
            alert("user in suspension!");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
    }
};

//signup fetch

const signupData = async () => {
    const data = {
        name: document.getElementById("Username").value,
        email: document.getElementById("Email").value,
        password: document.getElementById("C-Password").value,
    }
    await fetch(host + '/api/signUp', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
        },
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
    const handleResponse = {

        200:
            () => {
                location.reload();
                alert("A new password has been sent to the email");
            },
        403:
            () => {
                location.reload();
                alert("Email does not exist");
            },
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
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

    const handleResponse = {
        200: () => {
            location.reload();
            alert("User was added")
        },
        403: () => {
            alert("code is expired, please sign up again");
        },
        401: () => {
            location.reload();
            alert("Verification Error");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
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
    const response = await fetch(`${host}/api/suspension`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const handleResponse = {
        200: () => {
            alert("User status update")
        },
        403: () => {
            alert("user is closed");
        },
        401: () => {
            console.log("401")
            alert("Please enter a valid email");
        }
    };
    const body = await response.json();
    const handler = handleResponse[response.status];
    if (handler) {
        handler(body);
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
