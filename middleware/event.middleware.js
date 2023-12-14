const Event = require("../models/Event.model");

const isOrganizer = async (req, res, next) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const event = await Event.findById(eventId);

    if (!event) {
      return res.status(404).json({ message: "Event not found." });
    }

    if (event.organiser.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "You are not authorized to perform this action." });
    }

    next();
  } catch (error) {
    next({ ...error, message: "Error checking event organizer." });
  }
};

module.exports = {
  isOrganizer,
};
