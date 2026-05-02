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
  check("firstName")
    .notEmpty()
    .withMessage("First name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("First name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("First name can only contain letters"),

  check("lastName")
    .notEmpty()
    .withMessage("Last name is required")
    .trim()
    .isLength({ min: 2 })
    .withMessage("Last name must be at least 2 characters long")
    .matches(/^[a-zA-Z\s]+$/)
    .withMessage("Last name can only contain letters"),

  check("email")
    .isEmail()
    .withMessage("Please enter a valid email")
    .normalizeEmail(),

  check("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[!@#$%^&*(),.":{}|<>]/)
    .withMessage("Password must contain at least one special character")
    .trim(),

  check("confirmPassword")
    .trim()
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),

  check("userType")
    .notEmpty()
    .withMessage("User type is required")
    .isIn(["guest", "host"])
    .withMessage("Invalid user type"),

  check("terms")
    .notEmpty()
    .withMessage("You must accept the terms and conditions")
    .custom((value) => {
      if (value !== "on") {
        throw new Error("You must accept the terms and conditions");
      }
      return true;
    }),

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
      const user = new User({ firstName, lastName, email, password: hashedPassword, userType });
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

  User.findOne({ email: username })
    .then((user) => {
      if (!user) {
        return res.status(422).render("auth/Login", {
          pageTitle: "Login to Airbnb",
          currentPage: "Login",
          errors: ["No account found with that email address."],
          oldInput: { username },
        });
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(422).render("auth/Login", {
            pageTitle: "Login to Airbnb",
            currentPage: "Login",
            errors: ["Incorrect password. Please try again."],
            oldInput: { username },
          });
        }

        req.session.isLoggedIn = true;
        req.session.userId     = user._id.toString();
        req.session.userType   = user.userType;
        req.session.save(() => {
          res.redirect("/");
        });
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
