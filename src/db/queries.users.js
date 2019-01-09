const User = require("./models").User;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {

  createUser(newUser, callback){
    // Create a new user and hash the password using bcrypt
    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);
    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      // Use SendGrid to have a confirmation email be sent to the users email.
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
  }
 }
