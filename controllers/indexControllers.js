const varifyUser = require("../helpers/varifyUser");
const authorsModel = require("../model/schema/authorsSchema");
const BookModel = require("../model/schema/storeSchema");

// keep track the user is log in or not
let isLogin;

const getHomePage = async function (req, res, next) {
    const user = await varifyUser(req, res, next);

    const findAllBook = await BookModel.find({}).populate("author");

    res.render("pages/home", {
        pageName: "Home page",
        isLogin: user,
        books: findAllBook,
    });
};

const getSignInPage = function (req, res, next) {
    const params = req.params.name;
    res.render("pages/signIn", {
        pageName: "Sign In",
        isLogin,
        params,
    });
};

const getLoginpage = function (req, res, next) {
    const params = req.params.name;
    res.render("pages/login", {
        pageName: "Log In",
        isLogin,
        params,
    });
};

const uploadBookPage = async function (req, res, next) {
    const user = await varifyUser(req, res, next);

    const findAllAuthors = await authorsModel.find({}, { _id: 1, name: 1 });

    res.render("pages/uploadBook", {
        pageName: "upload book",
        isLogin: user,
        authors: findAllAuthors,
    });
};

const authorPage = async function (req, res, next) {
    const user = await varifyUser(req, res, next);
    res.render("pages/authors", {
        pageName: "authors",
        isLogin: user,
    });
};

const authorInfoPage = async function (req, res, next) {
    const user = await varifyUser(req, res, next);

    const findAllAuthors = await authorsModel.find({}).populate("books.bookId");

    res.render("pages/authorInfo", {
        pageName: "authors",
        isLogin: user,
        allAuthors: findAllAuthors,
    });
};

module.exports = {
    getHomePage,
    getSignInPage,
    getLoginpage,
    uploadBookPage,
    authorPage,
    authorInfoPage,
};
