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
      default: "Point",
    },
    coordinates: {
      type: [Number],
      required: true,
      index: "2dsphere",
    },
    typeOfBusiness: {
      type: String,
      enum: [
        "hotel",
        "restaurant",
        "cafe",
        "store",
        "musueum",
        "brand",
        "supermarket",
        "transport",
        "workplace",
        "other",
      ],
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
