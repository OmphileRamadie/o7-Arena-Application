var express = require("express");
var router = express.Router();

const {
  createEvent,
  getAllEvents,
  editEvent,
  deleteEvent,
  isLoggedIn,
  isAdmin,
} = require("../controllers/event.controllers");

router.post("/add-event", isAdmin, createEvent);
router.put("/edit-event/:id", isAdmin, editEvent);
router.delete("/delete-event/:id", isAdmin, deleteEvent);
router.get("/all-events", isLoggedIn, getAllEvents);

module.exports = router;
