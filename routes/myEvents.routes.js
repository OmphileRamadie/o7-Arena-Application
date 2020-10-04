var express = require("express");
var router = express.Router();

const {
  addToMyEvents,
  deleteMyEvent,
  checkSubscriber,
  getMyEvents,
} = require("../controllers/myEvents.controller");

router.get("/my-events", checkSubscriber, getMyEvents);
router.post("/my-events/new", checkSubscriber, addToMyEvents);
router.delete("/my-events/delete/:id", checkSubscriber, deleteMyEvent);

module.exports = router;
