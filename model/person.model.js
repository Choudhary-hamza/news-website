const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
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
  status: {
    type: String,
    enum: ["pending", "approved"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
const personModel =
  mongoose.models.Person || mongoose.model("Person", personSchema);
module.exports = personModel;
