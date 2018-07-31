var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var chatSchema = mongoose.Schema({
	ownerUserId: {
		type: mongoose.Schema.Types.ObjectId,
        ref: "User"
	},
	messages: Array
});

// adiciona os metodos do passport-local-mongoose dentro do schema user
chatSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Chat", chatSchema);
