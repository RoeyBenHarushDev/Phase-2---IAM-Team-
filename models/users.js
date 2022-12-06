const {Schema, model} = require('mongoose');

const userSchema = new Schema({
    name: {type: String , required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    loginDate: {type: Date, default: new Date()},
    type: {type: String, default: 'user'},
    status: {type: String, default: 'active'},
    suspensionTime: {type: Number, default: 0},
    suspensionDate: {type: Date, default: null}
}, {collection: 'users'});

const User = model('User',userSchema);

module.exports= User;