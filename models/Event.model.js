const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const eventSchema = new Schema(
  {
    nameOfTheEvent: {
      type: String,
      required: [true, "Name of the event is required"],
    },
    location: {
      type: String,
      enum: ["Burgos", "Paris"],
    },
    date: {
      type: Date,
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
      default: "free",
    },
    isPetFriendly: Boolean,
    isChildFriendly: Boolean,
    isEcoFriendly: Boolean,
    isAccessibilityFriendly: Boolean,
    isVeganFriendly: Boolean,
  },

  {
    // this second object adds extra properties: `createdAt` and `updatedAt`
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;