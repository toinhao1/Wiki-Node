require("dotenv").config();
const logger = require('morgan');

module.exports = {
  init(){
    app.use(logger('dev'));

  }
};
