var exports = module.exports = {};
var configuration = require("./models/configuration");

exports.isLoggedIn = function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

exports.getSystemConfigs = async () => {
    return await configuration.find({}).limit(1)
}