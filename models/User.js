const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      trim: true,
    },
    lastname: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    counrty: {
      type: String,
      default: "egypt",
    },
    bio: {
      type: String,
      default: "No Bio",
      trim: true,
      maxLength: 200,
    },
    profileImg: {
      url: {
        type: String,
      },
      cloudinary_id: {
        type: String,
        default: "default",
      },
    },
    password: {
      type: String,
      required: true,
    },
    blocked: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },
    birthday: {
      type: Date,
      required: true,
    },
    lastOpen: {
      type: Date,
      default: Date.now(),
    },
  },
  { timestamps: true }
);

userSchema.index({ fullName: "text" });

const User = mongoose.model("User", userSchema);

module.exports = User;
