const logOutBtn = document.getElementById('logOutBtn');
logOutBtn.addEventListener("click", async () => {
    await fetch("http://localhost:5000/api/logout");
    window.location.replace("http://localhost:5000/index.html");
});