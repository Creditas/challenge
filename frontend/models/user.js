var mongoose = require("mongoose"),
  passportLocalMongoose = require("passport-local-mongoose");

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    passwordCheck: String,
});

// adiciona os metodos do passport-local-mongoose dentro do schema user
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);
