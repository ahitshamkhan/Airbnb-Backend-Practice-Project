exports.isLoggedIn = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/Login");
  }
  next();
};

exports.isHost = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/Login");
  }
  if (req.session.userType !== "host") {
    return res.status(403).render("404", {
      pageTitle: "Access Denied",
      currentPage: "404",
    });
  }
  next();
};

exports.isGuest = (req, res, next) => {
  if (!req.session.isLoggedIn) {
    return res.redirect("/Login");
  }
  if (req.session.userType !== "guest") {
    return res.status(403).render("404", {
      pageTitle: "Access Denied",
      currentPage: "404",
    });
  }
  next();
};
