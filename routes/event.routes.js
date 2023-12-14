const express = require("express");
const router = express.Router();
const multer = require("multer");
const Event = require("../models/Event.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const storage = multer.memoryStorage();  
//const fileUploader = multer({ storage });
// const { checkEventOrganizer } = require("../middleware/event.middleware");
const fileUploader = require("../config/cloudinary.config");

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
router.post("/", isAuthenticated, (req, res, next) => {
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

// POST "/api/upload" => Route that receives the image, sends it to Cloudinary via the fileUploader and returns the image URL
router.post("/upload", fileUploader.single("imageUrl"), async (req, res, next) => {
  try {
    if (!req.file) {
    next(new Error("No file uploaded!"));
    return;
  }
  res.json({ fileUrl: req.file.path });
  } catch (error) {
   console.log(error) 
  }
  
});



module.exports = router;
