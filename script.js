const selectButton = document.getElementById("SelectButton");
const openRegisterForm = document.getElementById("SelectRegister");
const openLoginForm = document.getElementById("SelectLogin");
//login section
const loginForm = document.getElementById("LoginForm");
//register section
const registerForm = document.getElementById("RegisterForm");
const backLoginBtn = document.getElementById('backLoginBtn');
const backRegisterBtn = document.getElementById('backRegisterBtn');
//change button
const goRegister = document.getElementById('GoRegister');
const goLogin = document.getElementById('GoLogin');

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


