const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");


app.post('/signup' , async (req , res) =>{
    // const userObj = {
    //     firstName : "Ayush" ,
    //     lastName : "Kumar" ,
    //     emailId : "ayush123@gmail.com",
    //     password : "ayush@123"
    // }

    //creating a new instance of the User Model
    // const user = new User(userObj);


        const user = new User({
            firstName : "Rohit" ,
            lastName : "Sharma" ,
            emailId : "rohit123@gmail.com",
            password : "rohit@123",
            _id : "234445666500012234786234"
        });

        // above is not json ....this is JS Object.

        try {
            await user.save();
            res.send("User added successfully");
            console.log("User Added");
        } catch(err) {
            res.status(400).send("Error saving the user :" + user)
        }


})


connectDB()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(7777, () => {
      console.log("Server started at port number 7777...");
    });
  })
  .catch((err) => {
    console.log("Database cannont be connected");
  });
