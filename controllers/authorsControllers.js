const authoreModel = require("../model/schema/authorsSchema");

const insertAuthor = async function (req, res, next) {
    try {
        const { author, age, dob } = req.body;
        const authorInfo = await authoreModel({
            name: author,
            age,
            dob,
        });

        const saveAuthor = await authorInfo.save();

        if (saveAuthor) {
            return res.redirect("/author");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    insertAuthor,
};
