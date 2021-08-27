const express = require("express");
let router = express.Router();
require("dotenv").config();
const { checkLoggedIn } = require("../../middleware/auth");
const { grantAccess } = require("../../middleware/roles");

// model
const { User } = require("../../models/user_model");

// Register User
router.route("/register").post(async (req, res) => {
  try {
    // 1. check if email taken
    if (await User.emailTaken(req.body.email)) {
      return res.status(400).json({ message: "Sorry email is taken" });
    }

    // 2. creating the model (hash password)
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    // 3. generate token
    const token = user.generateToken();

    // 4. Send email
    const doc = await user.save();

    // Save and send cookie with token
    res.cookie("x-access-token", token).status(200).send(getUserProps(doc));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

// Login User
router.route("/login").post(async (req, res) => {
  try {
    // find user

    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Bad email" });

    // compare password
    const compare = await user.comparePassword(password);
    if (!compare) return res.status(400).json({ message: "Bad password" });

    // generate token
    const token = user.generateToken();

    // Save and send cookie with token
    res.cookie("x-access-token", token).status(200).send(getUserProps(user));
  } catch (error) {
    res.status(400).json({ message: "Error", error: error });
  }
});

// User Profile
router
  .route("/profile")
  .get(checkLoggedIn, grantAccess("readOwn", "profile"), async (req, res) => {
    try {
      const permission = res.locals.permission;
      const user = await User.findById(req.user._id);
      if (!user) return res.status(400).json({ message: "User not found" });

      res.status(200).json(permission.filter(user._doc));
    } catch (error) {
      res.status(400).json({ message: "Problem fetching user", error: error });
    }
  })
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        const user = await User.findOneAndUpdate(
          {
            _id: req.user._id,
          },
          {
            $set: {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              age: req.body.age,
            },
          },
          {
            new: true,
          }
        );

        if (!user) return res.status(404).json({ message: "User not found!" });

        res.status(200).json(getUserProps(user));
      } catch (error) {
        res.status(400).json({ message: "Problem Updating", error: error });
      }
    }
  );

// check if user is authenticated
router.route("/isauth").get(checkLoggedIn, async (req, res) => {
  res.status(200).send(getUserProps(req.user));
});

// Update email
router
  .route("/update_email")
  .patch(
    checkLoggedIn,
    grantAccess("updateOwn", "profile"),
    async (req, res) => {
      try {
        const { newemail, email } = req.body;

        if (await User.emailTaken(req.body.newemail)) {
          return res.status(400).json({ message: "Sorry email taken" });
        }

        const user = await User.findOneAndUpdate(
          {
            _id: req.user._id,
            email: email,
          },
          {
            $set: {
              email: newemail,
            },
          },
          { new: true }
        );

        // If user doesnt exists
        if (!user) return res.status(404).json({ message: "User not found!" });

        // generate token
        const token = user.generateToken();

        // Save and send cookie with token
        res
          .cookie("x-access-token", token)
          .status(200)
          .send(getUserProps(user));
      } catch (error) {
        res
          .status(400)
          .json({ message: "Problem Updating email", error: error });
      }
    }
  );

const getUserProps = (user) => {
  return {
    _id: user._id,
    email: user.email,
    role: user.role,
    firstname: user.firstname,
    lastname: user.lastname,
    age: user.age,
  };
};

module.exports = router;
