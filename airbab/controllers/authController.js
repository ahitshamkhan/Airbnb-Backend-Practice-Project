const { check, validationResult } = require("express-validator");
const User = require("../models/user");
const bcrypt = require("bcryptjs");

exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up for Airbnb",
    currentPage: "signup",
    errors: [],
    oldInput: {},
  });
};

exports.postSignup = [
  // First Name validation
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),

  // Last Name validation
  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters"),

  // Email validation
  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  // Password validation
  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.":{}<>]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  // Confirm Password validation
  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  // User Type validation
  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  // Terms Accepted validation
  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

  // Handler
  (req, res, next) => {
    const { firstName, lastName, email, password, userType } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).render("auth/signup", {
        pageTitle: "Sign Up for Airbnb",
        currentPage: "signup",
        errors: errors.array().map((error) => error.msg),
        oldInput: {
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          email: req.body.email,
          userType: req.body.userType,
        },
      });
    }

    bcrypt.hash(password, 12).then((hashedPassword) => {
      const user = new User({ firstName, lastName, email, password, userType });
      user
        .save()
        .then(() => {
          res.redirect("/Login");
        })
        .catch((err) => {
          return res.status(422).render("auth/signup", {
            pageTitle: "Sign Up for Airbnb",
            currentPage: "signup",
            errors: [err.message],
            oldInput: { firstName, lastName, email, password, userType },
          });
        });
    });
  },
];

exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login to Airbnb",
    currentPage: "Login",
    errors: [],
    oldInput: {},
  });
};

exports.postLogin = (req, res, next) => {
  const { username, password } = req.body;

  // Step 1: Find user by email
  User.findOne({ email: username })
    .then((user) => {

      // Step 2: If user not found, re-render login with error
      if (!user) {
        return res.status(422).render("auth/Login", {
          pageTitle: "Login to Airbnb",
          currentPage: "Login",
          errors: ["No account found with that email address."],
          oldInput: { username },
        });
      }

      // Step 3: Compare password with bcrypt
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(422).render("auth/Login", {
            pageTitle: "Login to Airbnb",
            currentPage: "Login",
            errors: ["Incorrect password. Please try again."],
            oldInput: { username },
          });
        }

        // Password matches — create session and redirect home
        req.session.isLoggedIn = true;
        res.redirect("/");
      });
    })
    .catch((err) => {
      return res.status(500).render("auth/Login", {
        pageTitle: "Login to Airbnb",
        currentPage: "Login",
        errors: [err.message],
        oldInput: { username },
      });
    });
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
