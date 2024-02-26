import { Router } from "express";
import passport from "passport";
const router = Router();

// Auth with google
// GET auth/google
router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

// Google auth Callback
// GET auth/google/callback
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/" }), (req, res) =>
  res.redirect("/post")
);

// logout
// GET auth/logout
router.get("/logout", (req, res) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
  // res.redirect("/");
});

export default router;
