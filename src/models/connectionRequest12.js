const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["ignored", "interested", "accepted", "rejected"],
        message: `{VALUE} is incorrect status type`,
      },
    },
  },
  {
    timestamps: true,
  }
);

//If i will ever do ConnectionRequest.find({fromUserId : 68a690665c7a28f062709bc8}) ==>all these queries become very very fast
// connectionRequestSchema.index({fromUserId : 1});

//If i will ever do ConnectionRequest.find({fromUserId : 68a690665c7a28f062709bc8 , toUserId : 4r6875648197158975918}) ==>all these queries become very very fast
connectionRequestSchema.index({fromUserId : 1 , toUserId : 1});


//before i will save in database , this pre function will be called.
//validation before saving
//(connectionRequest.fromUserId.equals(connectionRequest.toUserId)) is called like below
// because both are of object type and comparing by using = , == , === is not correct.

connectionRequestSchema.pre("save", function (next) {
  const connectionRequest = this;
  //Check if  the fromUserId is same as toUserId

  if ((connectionRequest.fromUserId.equals(connectionRequest.toUserId))) {
    throw new Error("Cannont send connection to self!!!");
  }
  next();
});

//DISCLAIMER : Above is not mandatory to write the validation in Schema. You can write it in api level also. 


const ConnectionRequestModel = new mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

module.exports = ConnectionRequestModel;
