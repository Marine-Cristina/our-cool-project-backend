const { Schema, model } = require("mongoose");

const businessSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    location: {
      type: String,
      enum: ["Burgos", "Paris"],
    },
    typeOfBusiness: {
      type: String,
      enum: ["restaurant", "shop", "coffee shop", "foodtruck", "musueum"],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isPetFriendly: Boolean,
    isChildFriendly: Boolean,
    isEcoFriendly: Boolean,
    isAccessibilityFriendly: Boolean,
    isVeganFriendly: Boolean,
  },

  {
    timestamps: true,
  }
);

const Business = model("Business", businessSchema);

module.exports = Business;
