const express = require("express");
const app = express();
const authRoutes = require("./routes/auth.routes");
const myEventRoutes = require("./routes/myEvents.routes");
const eventRoutes = require("./routes/event.routes");
const usersRoutes = require("./routes/users.routes");
const passportSetup = require("./config/passport");
const mongoose = require("mongoose");
const keys = require("./config/Keys");
const cookieSession = require("cookie-session");
const passport = require("passport");

app.use(
  cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keys.session.cookieKey] })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(express.json());

app.use(authRoutes);
app.use(eventRoutes);
app.use(myEventRoutes);
app.use(usersRoutes);

mongoose.connect(
  keys.mongoDB.dbURI,
  {
    useFindAndModify: false,
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
  },
  () => {
    console.log("Connected to MongoDb");
  }
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log("Listening on port 7000");
});
