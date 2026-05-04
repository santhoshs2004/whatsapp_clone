const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true // Keep unique to prevent duplicate usernames
    },
    email: {
      type: String,
      required: false,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    avatarColor: {
      type: String,
      default: "#22c55e",
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    lastSeen: {
      type: Date,
      default: Date.now
    },
    bio: {
      type: String,
      default: "Hey there! I am using WhatsApp."
    },
    profilePic: {
      type: String,
      default: ""
    },
    instagram: {
      type: String,
      default: ""
    },
    facebook: {
      type: String,
      default: ""
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
