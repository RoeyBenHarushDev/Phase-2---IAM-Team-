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
const express=require("express");
const path = require('path');
const app =express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:/";

openLoginForm.addEventListener('click', ()=> {
    selectButton.style.display = "none";
    loginForm.style.display = "block"
})

openRegisterForm.addEventListener('click', ()=> {
    selectButton.style.display = "none";
    registerForm.style.display = "block";
})

backRegisterBtn.addEventListener('click', ()=> {
    registerForm.style.display = "none";
    loginForm.style.display = "none"
    selectButton.style.display = "block";

})

backLoginBtn.addEventListener('click', ()=> {
    registerForm.style.display = "none";
    loginForm.style.display = "none"
    selectButton.style.display = "block";
})

goLogin.addEventListener('click', ()=>{
    registerForm.style.display = "none";
    loginForm.style.display = "block";
})

goRegister.addEventListener('click', ()=>{
    loginForm.style.display = "none";
    registerForm.style.display = "block";
})

forgotPasswordBtn.addEventListener('click',()=>{
    loginForm.style.display = "none";
    ForgotPasswordModel.style.display = 'block';
})
backForgotBtn.addEventListener('click', ()=>{
    ForgotPasswordModel.style.display = 'none';
    loginForm.style.display = "block";
})
submitRegisterForm.addEventListener('click', ()=>{
    registerForm.style.display = "none";
    VerifyByEmail.style.display = 'block';
})

//body reference
const mainDetails = document.getElementById("mainDetails")[0];

// create elements <table> and a <tbody>
const tbl = document.createElement("table");
const tblBody = document.createElement("tbody");

// cells creation
for (let j = 0; j <= 2; j++) {
    // table row creation
    let row = document.createElement("tr");

    for (let i = 0; i <= 2; i++) {
        // create element <td> and text node
        //Make text node the contents of <td> element
        // put <td> at end of the table row
        let cell = document.createElement("td");
        let cellText = document.createTextNode("cell is row " + j + ", column " + i);

        cell.appendChild(cellText);
        row.appendChild(cell);
    }

    //row added to end of table body
    tblBody.appendChild(row);
}

// append the <tbody> inside the <table>
tbl.appendChild(tblBody);
// put <table> in the <mainDetails>
mainDetails.appendChild(tbl);
// tbl border attribute to
tbl.setAttribute("border", "2");



app.use(express.static('./public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));
app.post('/login',function(req,res){
    let x=req.body.x;
    let y=req.body.y;
    let data={
        "x_op":x,
        "y_op":y
    }
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        const dbo = db.db("mdb");
        const myobj = { x: `${x}`, y: `${y}`};
        dbo.collection("customers").insertOne(myobj, function(err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            db.close();
        });
    });
    res.set({
        'Access-Control-Allow-Origin' : '*'
    });
    res.send(JSON.stringify(data));
});
app.get('/tb',function(req,res){
    let MongoClient = require('mongodb').MongoClient;
    let url = "mongodb://localhost:27017/";
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        let dbo = db.db("mydb");
        dbo.collection("customers").find({}).toArray(function(err, result) {
            if (err) throw err;
            let obj = '$(result)';
            for (let i = 0; i < obj.length; i++){
                app.locals.obj=result;
                db.close();
            }
        });
    });
});
