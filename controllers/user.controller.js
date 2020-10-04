const User = require("../models/user.model");

const isAdmin = (req, res, next) => {
  if (req.user.role === "Admin") {
    return next();
  } else {
    res.json({
      status: 401,
      message: "You are not Authorized to access this resource",
    });
  }
};

const getSubscribers = (req, res) => {
  User.find({ role: "Subscriber" }, function (err, users) {
    if (err) {
      res.json({
        status: 500,
        error: "There was an error retrieving the subscriber users",
      });
    } else {
      res.json({
        status: 200,
        users: users,
      });
    }
  });
};
const getAdmins = (req, res) => {
  let currentAdmin = req.user.name;

  User.find({ role: "Admin" }, function (err, users) {
    if (err) {
      res.json({
        status: 500,
        error: "There was an error retrieving the admin users",
      });
    } else {
      let allAdminUsers = users.filter((user) => user.name !== currentAdmin);
      console.log(allAdminUsers);
      res.json({
        status: 200,
        users: allAdminUsers,
      });
    }
  });
};

const removeUser = (req, res) => {
  const id = req.params.id;

  User.findByIdAndRemove(id, function (err) {
    if (err) {
      console.log("ERROR: user NOT removed. " + err);
      res.json({
        status: 500,
        message: "An error occured while removing a user",
      });
    } else {
      User.find(function (err, users) {
        if (err) {
          console.log(err);
          res.json({
            status: 500,
            message: "Some error occurred while retrieving the users.",
          });
        } else {
          res.json({
            status: 200,
            users: users,
            message: "User Removed Succesfully",
          });
        }
      });
    }
  });
};

module.exports = {
  getSubscribers,
  getAdmins,
  removeUser,
  isAdmin,
};
