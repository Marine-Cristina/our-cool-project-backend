require("dotenv").config();

require("./db");

const express = require("express");

const app = express();

require("./config")(app);

const indexRoutes = require("./routes/index.routes");
app.use("/api", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const businessRoutes = require("./routes/business.routes");
app.use("/businesses", businessRoutes);

const eventRoutes = require("./routes/event.routes");
app.use("/events", eventRoutes);

require("./error-handling")(app);

module.exports = app;
