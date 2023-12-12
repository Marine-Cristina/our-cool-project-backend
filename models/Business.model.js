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

    // coordinates: {
    //   type: {
    //     latitude: {
    //       type: Number,
    //       required: true,
    //     },
    //     longitude: {
    //       type: Number,
    //       required: true,
    //     },
    //   },
    //   required: false,
    //   index: "2dsphere",
    // },

    typeOfBusiness: {
      type: String,
      enum: [
        "hotel",
        "restaurant",
        "coffee-shop",
        "store",
        "museum",
        "theatre",
        "brand",
        "supermarket",
        "transport",
        "workplace",
        "other",
      ],
    },

    description: {
      type: String,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    isPetFriendly: {
      type: Boolean,
      default: false,
    },

    isChildFriendly: {
      type: Boolean,
      default: false,
    },

    isEcoFriendly: {
      type: Boolean,
      default: false,
    },

    isAccessibilityFriendly: {
      type: Boolean,
      default: false,
    },

    isVeganFriendly: {
      type: Boolean,
      default: false,
    },

    contact: {
      type: String,
      // required: [true, "Contact info is required"],
    },
  },

  {
    timestamps: true,
  }
);

const Business = model("Business", businessSchema);

module.exports = Business;
