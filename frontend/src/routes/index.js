var express = require("express");
var router = express.Router({ mergeParams: true });
var functions = require("../functions");

// HOME
router.get("/index", functions.isLoggedIn, function(req, res) {
  res.render("index");
});

module.exports = router;
