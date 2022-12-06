const mongoose = require('mongoose');
const consts = require('./constans');
const express = require("express");
const { DB_HOST, DB_USER, DB_PASS}= consts;

const url = DB_HOST;

const options = {
    useNewUrlParser: true,    // For deprecation warnings
    useUnifiedTopology: true, // For deprecation warnings
    user: DB_USER,
    pass: DB_PASS
};

mongoose.connect(url, options)
    .then(() => console.log('connected'))
    .catch(err => console.log(`connection error: ${err}`));


/*
const connectDb = async () => {
    try {
        await mongoose.connect(url, options)
        console.log("ON");
    } catch (error) {
        console.log(error.message)
    }
}

connectDb();*/
