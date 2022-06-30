const jwt = require("jsonwebtoken");
const JWT_TOKEN = process.env.JWT_TOKEN;

const varifyUser = async function (req, res, next) {
    try {
        const { user } = req.cookies;

        if (user) {
            const userVarify = jwt.verify(user, JWT_TOKEN);
            return userVarify;
        } else {
            return null;
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = varifyUser;
