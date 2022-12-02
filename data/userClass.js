class User{
    constructor(
        name,
        email,
        password,
        lastLoginDate = new Date(),
        type = 'user',
        status = "active",
        suspensionTime = "0",
        suspensionDate = "null"
    ) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.lastLoginDate = lastLoginDate;
        this.type = type;
        this.status = status;
        this.suspensionTime = suspensionTime;
        this.suspensionDate = suspensionDate;
    }
}

module.exports={User};