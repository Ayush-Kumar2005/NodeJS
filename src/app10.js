const express = require("express");
const connectDB = require("./config/database");
const app = express();
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  try {
    // ✅ Validate input before DB call
    validateSignUpData(req);

    const { emailId, firstName, lastName, password, gender, age, skills } =
      req.body;
    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    //  Check if the email already exists
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
      skills,
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

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not Valid");
    }

    //check whether the user/email you are trying to login is present or not in database.
    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      //create a JWT Token
      //this token secretly hides who the user is. If somebody gets this token then they can hack easily.

      const token = await user.getJWT();


      //Add the token to cookie and send the response back to the user

      // res.cookie("token", token , {httpOnly : true});
      res.cookie("token", token , {
        expires : new Date(Date.now() + 8 * 60 * 60 * 1000)  //expires in 8 hours
      } );
      res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

//profile API
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("Error:" + err.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  //Sending the connection request
  console.log("Sending the connection request");
  res.send(user.firstName + " sent the connection request");
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
