const express = require("express");
const router = express.Router();
const authControllers = require("../controllers/authControllers");

router.post("/user-signIn", authControllers.userSignIn);
router.get("/logout", authControllers.logOut);
router.post("/user-login", authControllers.logIn);

module.exports = router;
