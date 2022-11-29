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


