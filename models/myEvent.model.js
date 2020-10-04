const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myEventSchema = new Schema({
  _id: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  eventName: { type: String, required: true },
  eventDescription: {
    type: "string",
    required: true,
  },
  eventDate: { type: String, required: true },
});

module.exports = mongoose.model("MyEvents", myEventSchema);
