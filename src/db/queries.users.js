require("dotenv").config();
const User = require("./models").User;
const Collaborator = require("./models").Collaborator;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  createUser(newUser, callback){
    // Create a new user and hash the password using bcrypt
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword
    })
    // Use SendGrid to have a confirmation email be sent to the users email.
    .then((user) => {
      const msg = {
        to: newUser.email,
        from: 'test@example.com',
        subject: 'Account Confirmation',
        text: 'Welcome to Blocipedia',
        html: '<strong>Please confirm your account now to access all your features.</strong>'
      };
      sgMail.send(msg);
      callback(null, user);
      })
      .catch((err) => {
        callback(err);
      })
    },
    upgrade(id, callback){
      return User.findById(id)
      .then((user) => {
        if(!user){
          return callback("User does not exist!");
        } else {
          return user.updateAttributes({role: "premium"})
          }
      })
      .catch((err) => {
         callback(err);
      })
    },

    downgrade(id, callback){
      return User.findById(id)
      .then((user) => {
        if(!user){
          return callback("User does not exist!");
        } else {
          return user.updateAttributes({role: "standard"});
        }
      })
      .catch((err) => {
        callback(err);
      })
    },
    getUser(id, callback) {
      let result = {};
      User.findById(id)
      .then((user) => {
        if(!user) {
          callback(404);
        } else {
          result["user"] = user;
          Collaborator.scope({method: ["collaborationsFor", id]}).findAll()
          .then((collaborations) => {
            result["collaborations"] = collaborations;
            callback(null, result);
          })
          .catch((err) => {
            callback(err);
          })
        }
      })
    }
 }
