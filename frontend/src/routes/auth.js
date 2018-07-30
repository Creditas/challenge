var express = require("express"),
passport = require("passport"),
functions = require("../functions");

var router = express.Router({ mergeParams: true });
var user = require("../models/user");

// ===> ROUTES <===

router.get("/", function (req, res) {
    // res.render("index");
    res.render("landing", { currentUser: req.user });
});

// REGISTER
router.get("/register", function (req, res) {
    res.render("register");
});

router.post("/register", async (req, res) => {

    if (req.body.register.password == req.body.register.passwordCheck) {

        var newUser = new user({username: req.body.register.username})

        user.register(newUser, req.body.register.password, function (err, user) {
            if (err) {
                console.log(err);
                return res.render("register");
            }
            else {
                console.log("created");
                passport.authenticate("local")(req, res, function (req, res) {
                    return res.redirect("/index");
                });
            }
        });

        return res.redirect("/index");
    } else {
        res.send("senhas nao batem");
    }
});

// LOGIN 
router.get("/login", function (req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local", {
    // successRedirect: "/index",
    failureRedirect: "/login"
}),
function (req, res) {
        // Explicitly save the session before redirecting!
        req.session.save(() => {
            res.redirect('/index');
        })
    });

//LOGOUT
router.get("/logout", functions.isLoggedIn, function (req, res) {
    req.logout();
    res.redirect("/login");
});

router.post("/checkUser", async (req, res) => {
    user.findOne({ username : req.body.username }, function (err, user) {
        if (err) {
            res.send(false)
        } else {
            user ? res.send(true) : res.send(false) 
        }
    });
});

// ===> FIM ROUTES <===

module.exports = router;
