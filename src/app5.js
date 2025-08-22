const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require('validator');

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    // ✅ Validate input before DB call
    validateSignUpData(req);

    const { emailId, firstName,lastName, password , gender , age , skills } = req.body;
    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    // ✅ Check if the email already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // ✅ Create and save the new user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
      age,
      gender,
      skills
    });
    await user.save();

    // ✅ Success response (hide password)
    res.status(201).json({
      message: `${firstName} User added successfully`,
      user: {
        id: user._id,
        firstName: user.firstName,
        emailId: user.emailId,
      },
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(400).json({ error: err.message });
  }
});


app.post("/login" , async (req , res) => {
  try{
    const {emailId , password} = req.body;
    if(!validator.isEmail(emailId)){
            throw new Error("Email is not Valid");
    }

    //check whether the user/email you are trying to login is present or not in database.
    const user = await User.findOne({ emailId : emailId });

    if(!user){
      throw new Error("Invalid Credentials");
    };
    const isPasswordValid = await bcrypt.compare(password , user.password);
    if(isPasswordValid){
      res.send("Login Successfull");
    }
    else{
      throw new Error("Invalid Credentials");
    }
  }
  catch(err){
    res.status(400).send("Error:" +err.message);
  }
})

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
app.patch("/user/:userId", async (req, res) => {
  // const userId = req.body.userId;
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "userId",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills must not be greater than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully");
  } catch (err) {
    res.status(400).send("Update Failed : " + err.message);
  }
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
