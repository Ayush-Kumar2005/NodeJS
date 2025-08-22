const mongoose = require('mongoose');

const connectDB = async () =>{
    await mongoose.connect(
        "Your Connection String"
    );


    //for checking error part
    //throw new Error("Simulated DB connection error for testing");
};

module.exports = connectDB;

