const express = require("express");
const router = express.Router();

const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
// const { checkEventOrganizer } = require("../middleware/event.middleware");

// GET - "/"        List of all events.
router.get("/", (req, res) => {
  Event.find({})
    .then((events) => {
      console.log("Retrieved events", events);
      res.json(events);
    })
    .catch((error) => {
      next({ ...error, message: "Failed to retrieve events." });
    });
});

// GET - "/:eventId"        Details of one event by ID.
router.get("/:eventId", isAuthenticated, (req, res, next) => {
  const { eventId } = req.params;

  Event.findById(eventId)
    .then((eventFromDB) => {
      res.status(200).json(eventFromDB);
    })
    .catch((error) => {
      next({ ...error, message: "Error getting event." });
    });
});

// POST - "/"       Create new event.
router.post("/new", isAuthenticated, (req, res) => {
  const {
    nameOfTheEvent,
    location,
    date,
    organiser,
    user,
    price,
    description,
    isPetFriendly,
    isChildFriendly,
    isEcoFriendly,
    isAccessibilityFriendly,
    isVeganFriendly,
  } = req.body;

  Event.create({ ...req.body, user: req.payload._id })
    .then((eventFromDB) => {
      res.status(201).json(eventFromDB);
    })
    .catch((error) => {
      next({ ...error, message: "Error creating an event in the DB." });
    });
});

// PUT - "/:eventId"        Update specified event by ID.
router.put(
  "/:eventId",
  isAuthenticated,
  // checkEventOrganizer
  (req, res) => {
    Event.findByIdAndUpdate(req.params.eventId, req.body, { new: true })
      .then((updatedEvent) => {
        console.log(req.body, updatedEvent);
        res.status(200).json(updatedEvent);
      })
      .catch((error) => {
        next({ ...error, message: "Error updating Event." });
      });
  }
);

// DELETE - "/:eventId"         Delete specified event by ID.
router.delete(
  "/:eventId",
  isAuthenticated,
  // checkEventOrganizer,
  (req, res, next) => {
    const { eventId } = req.params;

    Event.findByIdAndDelete(eventId)
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        next({ ...error, message: "Error deleting Event." });
      });
  }
);

module.exports = router;
