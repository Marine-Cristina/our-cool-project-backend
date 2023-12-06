const express = require("express");
const router = express.Router();
const Business = require("../models/Business.model");
const { restart } = require("nodemon");

router.post("/", (req, res, next) => {
  const {
    name,
    location,
    typeOfBusiness,
    user,
    isPetFriendly,
    isChildFriendly,
    isEcoFriendly,
    isAccessibilityFriendly,
    isVeganFriendly,
  } = req.body;
  Business.create({
    name,
    location,
    typeOfBusiness,
    user,
    isPetFriendly,
    isChildFriendly,
    isEcoFriendly,
    isAccessibilityFriendly,
    isVeganFriendly,
  })
    .then((businessFromDB) => {
      res.status(201).json(businessFromDB);
    })
    .catch((error) => {
      next({ error, message: "Error creating a business in the DB" });
    });
});

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

router.get("/:businessId", (req, res) => {
  const { businessId } = req.params;
  Business.findById(businessId)
    .then((businessFromDB) => {
      res.status(200).json(businessFromDB);
    })
    .catch((error) => {
      next({ error, message: "Error getting business" });
    });
});

router.put("/:businessId", (req, res) => {
  Business.findByIdAndUpdate(req.params.businessId, req.body, { new: true })
    .then((updatedBusiness) => {
      console.log(req.body, updatedBusiness);
      res.status(200).json(updatedBusiness);
    })
    .catch((error) => {
      next({ ...error, message: "Failed to retrieve businesses" });
    });
});

router.delete("/:businessId", (req, res, next)=>{
    const {businessId} = req.params; 
    Business.findByIdAndDelete(businessId)
    .then(()=> {
        res.status(200).send(); 
    })
    .catch((error)=> {
        next({error, message : "Error deleting Business"})
    })
})

module.exports = router; 