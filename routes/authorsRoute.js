const express = require("express");
const route = express();
const authorControllers = require("../controllers/authorsControllers");

route.post("/insert-author", authorControllers.insertAuthor);

module.exports = route;
