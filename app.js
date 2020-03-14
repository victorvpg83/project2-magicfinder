require("dotenv").config();

const express = require("express");
const path = require("path");
const app = express();

const hbs = require("hbs");
const logger = require("morgan");

require("./configs/mongoose.config");
require("./configs/middlewares.config")(app);
require("./configs/locals.config")(app);
require("./configs/passport.config")(app);
require("./public/javascripts/events");

const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

hbs.registerHelper("ifUndefined", (value, options) => {
  if (arguments.length < 2)
    throw new Error("Handlebars Helper ifUndefined needs 1 parameter");
  if (typeof value !== undefined) {
    return options.inverse(this);
  } else {
    return options.fn(this);
  }
});

const apiRoutes = require("./routes/api/addCard.routes");
app.use("/api", apiRoutes);

const index = require("./routes/index.routes");
app.use("/", index);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);
app.use("/events", require("./routes/event.routes"));
app.use("/market", require("./routes/market.routes"));
app.use("/cardfinder", require("./routes/cardfinder.routes"));
app.use("/cardDetail", require("./routes/cardDetail.routes"));

module.exports = app;
