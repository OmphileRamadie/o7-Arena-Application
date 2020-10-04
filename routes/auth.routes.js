const router = require("express").Router();
const passport = require("passport");
const CLIENT_UPDATE_ROLE = "http://localhost:3000/signin";
const {
  signUpUser,
  signInUser,
  updateProfile,
  signOutUser,
} = require("../controllers/auth.controllers");

router.post("/sign-up", signUpUser);
router.post("/sign-in", signInUser);
router.put("/update-profile/:id", updateProfile);
router.get("/sign-out", signOutUser);

router.get(
  "/google-login",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({ status: 200, user: req.user });
  } else {
    res.json({ status: 400, message: "No user" });
  }
});

router.get(
  "/google-login/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_UPDATE_ROLE,
    failureRedirect: "/sign-in/failed",
  })
);

router.get("/sign-in/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
});

module.exports = router;
