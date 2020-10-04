const myEvent = require("../models/myEvent.model");
const User = require("../models/user.model");

const checkSubscriber = (req, res, next) => {
  if (req.user.role === "Subscriber") {
    return next();
  } else {
    res.json({
      status: 401,
      message: "You are not Authorized to access this resource",
    });
  }
};

const getMyEvents = (req, res) => {
  const user = req.user._id;
  User.findById(user)
    .populate("events")
    .exec((err, user) => {
      if (err) {
        return res.json({
          status: 400,
          error: "Failed to fetch events",
        });
      }

      return res.json({
        status: 200,
        myEvents: user.events,
      });
    });
};

const addToMyEvents = (req, res) => {
  const _id = req.body.eventId;
  const user = req.user._id;

  User.findById(user).exec((err, data) => {
    if (err) {
      return res.json({
        status: 400,
        error: "Failed to load user",
      });
    } else {
      let existingEvent = data.events.indexOf(_id);

      if (existingEvent === -1) {
        data.events.push(_id);
        data.save();
        res.json({
          status: 200,
          message: "Event added successfully",
        });
      } else {
        return res.json({
          status: 400,
          error: "That event is already added to your events",
        });
      }
    }
  });
};

const deleteMyEvent = (req, res) => {
  let id = req.params.id;
  let user = req.user._id;

  User.findById(user)
    .populate("events")
    .exec((err, user) => {
      if (err) {
        return res.json({
          status: 400,
          error: "Failed to fetch events",
        });
      } else {
        user.events.pull({ _id: id });
        user.save();

        return res.json({
          status: 200,
          myEvents: user.events,
        });
      }
    });
};

module.exports = {
  getMyEvents,
  addToMyEvents,
  deleteMyEvent,
  checkSubscriber,
};
