exports.logout = (req, res) => {
    console.log("HERE");
    res.cookie("token", "", { maxAge: 1 });
    res.end();
};