exports.logout = (req, res) => {
    res.cookie("token", "", { maxAge: 1 });
    res.end();
};