

function userExist(email){
    list.table.forEach(function (i) {
        if (JSON.stringify(i.mail) === JSON.stringify(email)) {
            throw new Error("Email already exists")
        }
    })
    return
}



function handleSignUp(request,response) {
    let body = [];
    request
        .on("error", (err) => {
            console.error(err);
        })
        .on("data", (chunk) => {
            body.push(chunk);
        })
        .on("end", () => {
            body = Buffer.concat(body).toString();
            body = JSON.parse(body);
        })

    try {
        console.log(body);
        userExist(body.mail)
        sendEmail(body.mail)
        return constructResponse(response, {}, 200);

    } catch (e) {
        console.log(e);
        return constructResponse(response, {error: e.message}, 401);
    }
}
