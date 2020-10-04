const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: { type: String, default: "none" },

  events: [{ type: Schema.Types.ObjectId, ref: "Event" }],
});

module.exports = mongoose.model("User", UserSchema);
