var express = require("express"),
router = express.Router({ mergeParams: true }),
functions = require("../functions"),
user = require("../models/user"),
chat = require("../models/chat");

// HOME
router.get("/index", functions.isLoggedIn, function(req, res) {
	res.render("index");
});

router.post("/sendMessage", functions.isLoggedIn, function(req, res) {
	// req.body = JSON.parse(req.sanitize(JSON.stringify(req.body)));

	console.log(req.body);

	res.send({})

	// userReport.create({ infos: req.body, userId: req.user._id, ticket: result }, function (err, newReport) {
	// 	if (err) {
	// 		res.send("ops: " + err);
	// 	}
	// 	else {
	// 		res.redirect("/reports");
	// 	}
	// });
});

module.exports = router;
