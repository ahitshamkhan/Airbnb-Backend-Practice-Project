
exports.getLogin = (req, res, next) => {
  res.render("auth/Login", {
    pageTitle: "Login to Airbnb",
    currentPage: "Login",
  });
};

