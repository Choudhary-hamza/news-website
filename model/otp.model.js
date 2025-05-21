const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["reader", "writer", "admin"],
    default: "reader",
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // document will be automatically deleted after 1 hour (3600 seconds)
  },
});

// Check if the model already exists before defining it
const OtpModel = mongoose.models?.Otp || mongoose.model("Otp", otpSchema);

module.exports = OtpModel;
