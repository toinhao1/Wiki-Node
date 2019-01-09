const express = require("express");
const router = express.Router();
const validation = require("./validation");
const User = require("../../src/db/models").User;
const userController = require("../controllers/userController")

router.get("/users/signup", userController.signUp);
router.post("/users/signup", validation.validateUsers, userController.create);


module.exports = router;
