var mongoose = require("mongoose"),
    passportLocalMongoose = require("passport-local-mongoose");

var configurationSchema = mongoose.Schema({
    database: String,
    user: String,
    pass: String

});

// adiciona os metodos do passport-local-mongoose dentro do schema user
// configurationSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Configuration", configurationSchema);
