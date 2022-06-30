const jwt = require("jsonwebtoken");
const userModel = require("../model/schema/userSchema");
const bcryptjs = require("bcryptjs");

const userSignIn = async function (req, res, next) {
    try {
        const { name, email, password } = req.body;

        const findUserIsExist = await userModel.findOne({ email });

        if (findUserIsExist) {
            return res.redirect("/signIn/" + "user email is already exist");
        } else {
            const userSignIn = new userModel({
                name,
                email,
                password,
            });

            const user = await userSignIn.save();
            const token = await userSignIn.genrateUserToken();

            res.cookie("user", token);

            if (user) {
                res.redirect("/");
            }
        }
    } catch (err) {
        console.log(err);
    }
};

const logOut = async function (req, res, next) {
    try {
        res.clearCookie("user");
        res.redirect("/");
    } catch (err) {
        console.log(err);
    }
};

const logIn = async function (req, res, next) {
    try {
        const { email, password } = req.body;

        if (email && password) {
            const userFindInDb = await userModel.findOne({ email });

            if (!!userFindInDb) {
                const passwordIsMatch = await bcryptjs.compare(password, userFindInDb.password);

                if (!!passwordIsMatch) {
                    const token = await userFindInDb.genrateUserToken();

                    res.cookie("user", token);
                    res.redirect("/");
                } else {
                    return res.redirect("/login/" + "user password is not match");
                }
            } else {
                return res.redirect("/login/" + "user is not exist");
            }
        } else {
            return res.redirect("/login/" + "please fill all filds");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    userSignIn,
    logOut,
    logIn,
};
