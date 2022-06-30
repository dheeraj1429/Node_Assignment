const express = require("express");
const router = express.Router();
const indexControllers = require("../controllers/indexControllers");

router.get("/", indexControllers.getHomePage);
router.get("/signIn/:name", indexControllers.getSignInPage);
router.get("/login/:name", indexControllers.getLoginpage);
router.get("/upload-book", indexControllers.uploadBookPage);
router.get("/author", indexControllers.authorPage);
router.get("/author-info", indexControllers.authorInfoPage);

module.exports = router;
