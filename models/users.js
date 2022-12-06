const {model,Schema} = require('mongoose');


const userSchema = new Schema({
    name: {type: String , required: true },
    email: {type: String, required: true},
    password: {type: String, required: true},
    loginDate: {type: Date, default: new Date()},
    type: {type: String, default: 'user'},
    status: {type: String, default: 'active'},
    suspensionTime: {type: Number, default: 0},
    suspensionDate: {type: Date, default:0}
}, {collection: 'user'});

const User = model('user',userSchema);

module.exports= User;