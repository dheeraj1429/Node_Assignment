require("dotenv").config();
const express = require("express"),
    app = express(),
    path = require("path"),
    PORT = process.env.PORT || 7000,
    dbConnectionFunction = require("./model/db/db"),
    cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.static(path.join(path.resolve("views"))));
app.use(express.static(path.join(path.resolve("public"))));
app.use(express.static(path.join(path.resolve("uploads"))));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const indexRoute = require("./routes/indexRoute");
const authRoute = require("./routes/authRoute");
const storeRoute = require("./routes/storeRouter");
const authoreRoute = require("./routes/authorsRoute");

app.use("/", indexRoute);
app.use("/auth", authRoute);
app.use("/store", storeRoute);
app.use("/author", authoreRoute);

// database connection
dbConnectionFunction(() => {
    app.listen(PORT, () => {
        console.log(`server listen in port ${PORT}`);
    });
});
