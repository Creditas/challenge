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

	// salva msg para depois lista-la nos chats do usuario

	res.send({ text : "aloha"})

});

module.exports = router;
