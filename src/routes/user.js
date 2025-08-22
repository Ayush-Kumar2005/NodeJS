const express = require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const userRouter = express.Router();

const USER_SAFE_DATA = "firstName lastName photoUrl about skills gender";
//get all the pending requests for the logged in user
userRouter.get("/user/requests/received", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId: loggedInUser._id,
      status: "interested",
      // }).populate("fromUserId", ["firstName", "lastName"]);
    }).populate("fromUserId", USER_SAFE_DATA);

    res.json({
      message: "Data fetched successfully",
      data: connectionRequests,
    });
  } catch (err) {
    res.status(400).send("Error: " + err.message);
  }
});

userRouter.get("/user/requests/connections", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or: [
        { toUserId: loggedInUser._id, status: "accepted" },
        { fromUserId: loggedInUser._id, status: "accepted" },
      ],
    })
      .populate("fromUserId", USER_SAFE_DATA)
      .populate("toUserId", USER_SAFE_DATA); // populate both sides

    const data = connections.map((row) => {
      // if I sent the request → show receiver
      if (row.fromUserId._id.toString() === loggedInUser._id.toString()) {
        return row.toUserId;
      }
      // if I received the request → show sender
      return row.fromUserId;
    });

    res.json({
      message: "All connections data fetched successfully",
      data: data,
    });
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
});

userRouter.get("/feed", userAuth, async (req, res) => {
  try {
    // user should see all the user card except
    // 1. his own card
    // 2. his connections
    // 3. ignored people
    // 4. already sent the connection request to someone

    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    limit = (limit>50 )? 50 : limit;
    const skip = (page - 1) * limit;

    //find all connection requests(sent+received)
    const connectionRequests = await ConnectionRequest.find({
      $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
    })
      .select("fromUserId  toUserId")
      .populate("fromUserId", "firstName lastName")
      .populate("toUserId", "firstName lastName");

    const hideUsersFromFeed = new Set();
    connectionRequests.forEach((request) => {
      hideUsersFromFeed.add(request.fromUserId._id.toString());
      hideUsersFromFeed.add(request.toUserId._id.toString());
    });

    // console.log(hideUsersFromFeed);

    //remaining users
    const users = await User.find({
      $and: [
        { _id: { $nin: Array.from(hideUsersFromFeed) } },
        { _id: { $ne: loggedInUser._id } },
      ],
    })
      .select(USER_SAFE_DATA)
      .skip(skip)
      .limit(limit);

    // console.log(users);

    res.send(users);
  } catch (err) {
    res.status(404).json({ message: "Error: " + err.message });
  }
});

module.exports = userRouter;
