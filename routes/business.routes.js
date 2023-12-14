const express = require("express");
const router = express.Router();
const fileUploader = require("../config/cloudinary.config");

const multer = require("multer");
const Business = require("../models/Business.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
// const { checkBusinessOwner } = require("../middleware/business.middleware");

// GET - "/"        List of all Businesses.
router.get("/", (req, res) => {
  Business.find({})
    .then((businesses) => {
      console.log("retrived businesses", businesses);
      res.json(businesses);
    })
    .catch((error) => {
      next({ ...error, message: "Failed to retrieve businesses" });
    });
});

// GET - "/:businessId"        Details of one business by ID.
router.get("/:businessId", isAuthenticated, (req, res, next) => {
  const { businessId } = req.params;

  Business.findById(businessId)
    .then((businessFromDB) => {
      res.status(200).json(businessFromDB);
    })
    .catch((error) => {
      next({ error, message: "Error getting business" });
    });
});

// POST - "/"       Create new business.
router.post("/", isAuthenticated, (req, res, next) => {
  const {
    name,
    country,
    state,
    typeOfBusiness,
    description,
    owner,
    isPetFriendly,
    isChildFriendly,
    isEcoFriendly,
    isAccessibilityFriendly,
    isVeganFriendly,
    contact,
  } = req.body;

  Business.create({ ...req.body })
    .then((businessFromDB) => {
      res.status(201).json(businessFromDB);
    })
    .catch((error) => {
      next({ error, message: "Error creating a business in the DB" });
    });
});

// PUT - "/:businessId"        Update specified business by ID.
router.put(
  "/:businessId",
  isAuthenticated,
  // checkBusinessOwner,
  (req, res, next) => {
    const { businessId } = req.params;

    Business.findByIdAndUpdate(businessId, req.body, { new: true })
      .then((updatedBusiness) => {
        console.log(req.body, updatedBusiness);
        res.status(200).json(updatedBusiness);
      })
      .catch((error) => {
        next({ ...error, message: "Failed to update the business" });
      });
  }
);

// DELETE - "/:businessId"         Delete specified business by ID.
router.delete(
  "/:businessId",
  isAuthenticated,
  // checkBusinessOwner,
  (req, res, next) => {
    const { businessId } = req.params;
    Business.findByIdAndDelete(businessId)
      .then(() => {
        res.status(200).send();
      })
      .catch((error) => {
        next({ error, message: "Error deleting Business" });
      });
  }
);

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
