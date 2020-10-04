var express = require("express");
var router = express.Router();

const {
  getSubscribers,
  getAdmins,
  isAdmin,
  removeUser,
} = require("../controllers/user.controller");

router.get("/all-subscribers", isAdmin, getSubscribers);
router.get("/all-admins", isAdmin, getAdmins);
router.delete("/remove-user/:id", isAdmin, removeUser);

module.exports = router;
