exports.getSignup = (req, res, next) => {
  res.render("auth/signup", {
    pageTitle: "Sign Up for Airbnb",
    currentPage: "signup",
  });
};

exports.postSignup = (req, res, next) => {
  console.log(req.body);
  res.redirect("/Login");
};

exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login to Airbnb",
    currentPage: "Login",
  });
};

exports.postLogin = (req, res, next) => {
  console.log(req.body);
  req.session.isLoggedIn = true;
  res.redirect("/");
};

exports.getLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
