const express = require("express");
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");
const User = require("../models/user");
const cookieParser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(cookieParser());


authRouter.post("/signup", async (req, res) => {
  try {
    //  Validate input before DB call
    validateSignUpData(req);

    const { emailId, firstName, lastName, password, gender, age, skills } =
      req.body;
    //Encrypt the password

    const passwordHash = await bcrypt.hash(password, 10);
    // console.log(passwordHash);

    //  Check if the email already exists
    const existingUser = await User.findOne({ emailId });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Create and save the new user
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

    // Success response (hide password)
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


authRouter.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("Email is not Valid");
    }

    const user = await User.findOne({ emailId: emailId });

    if (!user) {
      throw new Error("Invalid Credentials");
    }
    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
         const token = await user.getJWT();

        res.cookie("token", token , {
            expires : new Date(Date.now() + 8 * 60 * 60 * 60 ) 
        } );
        res.send("Login Successfull");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (err) {
    console.error("Error"+err.message);
    res.status(400).send("Error:" + err.message);
  }
});


authRouter.post("/logout" , async (req,res) =>{
    res.cookie("token" , null ,{
        expires : new Date(Date.now())
    });
    res.send("Logout Succesfully");
})


module.exports = authRouter;