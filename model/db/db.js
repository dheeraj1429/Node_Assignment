const mongoose = require("mongoose");

// connect your cloud url
const url = process.env.MONGODB_URL;
const mongo = "mongodb://localhost:27017/demo";

const dbConnectionFunction = function (callBack) {
    mongoose
        .connect(mongo)
        .then((res) => {
            console.log("database connected..");
            callBack();
        })
        .catch((err) => {
            console.log(err);
        });
};

module.exports = dbConnectionFunction;
