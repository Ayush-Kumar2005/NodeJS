const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");

//as req.body will not read our json data...this express.json() middleware will help to read our JSON Data.
app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);
  const user = new User(req.body);

  const firstName = req.body.firstName;

  // const user = new User({
  //           firstName : "Rohit" ,
  //           lastName : "Sharma" ,
  //           emailId : "rohit123@gmail.com",
  //           password : "rohit@123",
  //           _id : "234445666500012234786234"
  //       });

  try {
    await user.save();
    res.send(firstName + " User added successfully");
    console.log("User Added");
  } catch (err) {
    res.status(400).send("Error saving the user :" + user);
  }
});

//get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;

  try {
    const users = await User.find({ emailId: userEmail }); //it will give array of all the user with this email id
    if (users.length === 0) {
      res.status(404).send("User Not found");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

// feed API -- GET /feed - get all the users from the database
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Delete API - Delete an user by ID
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).send("ID already deleted or does not exist");
    }

    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }
});

//Update API - Update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  // const emailId = req.body.emailId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Something went wrong");
  }

  //IF YOU WANT TO UPDATE USING EMAIL
  // try {
  //   const user = await User.findOneAndUpdate({ emailId : email }, data, {
  //     returnDocument: "before",
  //   });
  //   console.log(user);
  //   res.send("User updated successfully");
  // } catch (err) {
  //   res.status(400).send("Something went wrong");
  // }
});


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
