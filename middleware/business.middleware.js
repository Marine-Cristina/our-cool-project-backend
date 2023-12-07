const Business = require("../models/Business.model");

const checkBusinessOwner = async (req, res, next) => {
  try {
    const businessId = req.params.businessId;
    const userId = req.user !== undefined ? req.user._id : null;
    console.log("User ID:", userId);

    const business = await Business.findById(businessId);

    if (!business) {
      return res.status(404).json({ message: "Business not found." });
    }

    if (business.user && business.user.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }

    next();
  } catch (error) {
    console.error("Error checking business owner:", error);
    next({ ...error, message: "Error checking business owner." });
  }
};

module.exports = {
  checkBusinessOwner,
};
