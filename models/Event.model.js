const { Schema, model } = require("mongoose");

const countrySchema = new Schema({
  listIdx: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  iso2: {
    type: String,
    required: true,
  },
});

const stateSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  state_code: {
    type: String,
    required: true,
  },
});

const eventSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name of the event is required"],
    },

    imageURL: {
      type : String,
    },

    country: {
      type: countrySchema,
      required: true,
    },

    state: {
      type: stateSchema,
      required: true,
    },

    // coordinates: {
    //   type: [Number],
    //   required: true,
    //   index: "2dsphere",
    // },

    date: {
      type: [],
    },

    organizer: {
      type: Schema.Types.ObjectId,
      ref: "Business",
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
    },

    description: {
      type: String,
    },

    isPetFriendly: Boolean,

    isChildFriendly: Boolean,

    isEcoFriendly: Boolean,

    isAccessibilityFriendly: Boolean,

    isVeganFriendly: Boolean,

    contact: {
      type: String,
      ref: "Bussines.contact",
    },

  },

  {
    timestamps: true,
  }

);

const Event = model("Event", eventSchema);

module.exports = Event;
