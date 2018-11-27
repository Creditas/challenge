var env = process.env.NODE_ENV || 'development';
var config = require('./config')[env];

var express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    bodyParser = require("body-parser"),
    expressSanitizer = require("express-sanitizer"),
    mongoose = require("mongoose"),
    http = require("http"),
    database = require("./class/database");

var authRoutes = require("./routes/auth"),
    indexRoutes = require("./routes/index");

// importa user model
var User = require("./models/user");

// inicializa engine das viwes
app.set('view engine', 'ejs');

// set a pasta public estatica para sempre buscar css e js dentro dela
app.use(express.static("public"));

// inicializa o urlencoder para fazer o parse do corpo das requisicoes para dentro de req
app.use(bodyParser.urlencoded({ extended: true }));
//app.use(bodyParser.json());

// inicializa o sanitizer para evitar xss (js injection)
app.use(expressSanitizer());

// inicializa o reescritor de url para utilizar REST (GET, PUT, POST, DELETE...)
app.use(methodOverride("_method"));

app.use(require("express-session")({
    secret: "the best project ever",
    resave: false,
    saveUninitialized: false
}));

// inicializa o passport(para parse de senhas) e session
app.use(passport.initialize());
app.use(passport.session());

// diz para o passport utilizar o metodo de authenticacao ja importado no modelo.
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function (req, res, next) {
    res.locals.currentUser = req.user;
    next();
});

var routes = [authRoutes, indexRoutes];
app.use(routes);

// 404
app.get("*", function (req, res) {
    res.send("ops, wrong way!");
});

app.on('ready', function () { 
    var server = http.createServer(app);
    server.listen(config.server.port, config.server.host, function () {

        if (server.listening) {
            console.log('Server running at http://' + config.server.host + ':' + config.server.port);
        }
    });
});

const main = async () => {
    await new database(config.database.host, config.database.port, config.database.db, config.database.user, config.database.pass);
    mongoose.connection.once('open', function () {
        // All OK - envia para emit. 
        console.log("Database Connected!")
        app.emit('ready');
    });
}

main()