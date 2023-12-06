const express = require ("express"); 
const router = express.Router();


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

  router.put("/:businessId", (req, res) => {
    Business.find({})
      .then((businesses) => {
        console.log("retrived businesses", businesses);
        res.json(businesses);
      })
      .catch((error) => {
        next({ ...error, message: "Failed to retrieve businesses" });
      });
  });