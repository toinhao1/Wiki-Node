module.exports = {
  validateUsers(req, res, next) {
     if(req.method === "POST") {

       req.checkBody("email", "must be valid").isEmail();
       req.checkBody("name", "must be at least 5 characters in length").isLength({min: 5});
       req.checkBody("password", "must be at least 6 characters in length").isLength({min: 6});
       req.checkBody("passwordConfirmation", "must match password provided").optional().matches(req.body.password);
     }

     const errors = req.validationErrors();

     if (errors) {
       req.flash("error", errors);
       return res.redirect(req.headers.referer);
     } else {
       return next();
     }
   },
   validateUserSignin(req, res, next) {
      if(req.method === "POST") {

        req.checkBody("name", "must be at least 5 characters in length").isLength({min: 5});
        req.checkBody("password", "must match password provided").matches(req.body.password);
      }

      const errors = req.validationErrors();

      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    },
    validateWiki(req, res, next) {
      if (req.method === "POST") {

        req.checkBody("title", "must be at least 4 characters in legnth").isLength({min: 4});
        req.checkBody("body", "must be at least 20 characters in length").isLength({min: 20});
      }
      const errors = req.validationErrors();

      if (errors) {
        req.flash("error", errors);
        return res.redirect(req.headers.referer);
      } else {
        return next();
      }
    }
}
