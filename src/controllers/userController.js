const userQueries = require("../db/queries.users.js");
const wikiQueries = require("../db/queries.wikis.js");
const passport = require("passport");
const stripeKey = process.env.STRIPE_KEY;
const stripe = require("stripe")("sk_test_mpdaymmx6L6rHmqGQ5tP18FE");

module.exports = {
  create(req, res, next) {
    console.log("hello");
    let newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };
    userQueries.createUser(newUser, (err, user) => {
      if (err) {
        req.flash("error", err);
        res.redirect("/users/signup");
      } else {
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed up!");
          res.redirect("/wikis")
        })
      }
    })
  },
  signUp(req, res, next){
    console.log("hello")
    res.render("users/signup");
  },
  signInForm(req, res, next) {
    res.render("users/sign_in");
  },
  signIn(req, res, next){
   passport.authenticate("local")(req, res, function () {
     if(!req.user){
       req.flash("notice", "Sign in failed. Please try again.")
       res.redirect("/users/sign_in");
     } else {
       req.flash("notice", "You've successfully signed in!");
       res.redirect("/wikis");
     }
   })
  },
  signOut(req, res, next){
   req.logout();
   req.flash("notice", "You've successfully signed out!");
   res.redirect("/");
   },
   upgradeForm(req, res, next){
      res.render("users/upgrade", {stripeKey});
    },
    upgrade(req, res, next){
      let payment = 1500;
      stripe.customers.create({
        email: req.body.stripeEmail,
        source:req.body.stripeToken,
      }) .then((customer) => {
        stripe.charges.create({
          amount: payment,
          description: "Blocipedia Premium Account Charge",
          currency: "usd",
          customer: customer.id,
        })
      }).then((charge) => {
        userQueries.upgrade(req.user.dataValues.id);
        req.flash("notice", "Your account is upgraded, you've been charged $15.00. Enjoy your premium account!");
        res.redirect("/wikis");
      })
    },
    downgrade(req, res, next){
      userQueries.downgrade(req.user.dataValues.id);
      wikiQueries.downgradePrivateWikis(req.user.dataValues.id);
      req.flash("notice", "Your account has been downgraded, say goodbye to your premium features!");
      res.redirect("/");
    }
}
