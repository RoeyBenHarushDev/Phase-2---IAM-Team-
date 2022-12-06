const mongoose = require('mongoose');
const consts = require('../data/constans');
const { DB_HOST, DB_USER, DB_PASS}= consts;

const url = DB_HOST;

const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};


const connectDb = async () => {
    try {
        await mongoose.connect(url, options)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log(`connection error: ${error.message}`);
    }
}

connectDb();
module.exports = {connectDb}
