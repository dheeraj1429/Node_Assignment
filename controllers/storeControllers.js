const BookModel = require("../model/schema/storeSchema");
const authorModel = require("../model/schema/authorsSchema");
const varifyUser = require("../helpers/varifyUser");

const uploadBook = async function (req, res, next) {
    try {
        /**
         * @param { object } get all information about the books and the user
         * @return if the data is inserted into the database then redirect the page into the home page
         */
        const { bookName, Published, price, author } = req.body;
        const filename = req.file.filename;

        const book = await new BookModel({
            name: bookName,
            published: Published,
            price,
            image: filename,
            author,
        });

        const bookUpload = await book.save();

        const findAuthor = await authorModel.updateOne({ _id: author }, { $push: { books: { bookId: book._id } } });

        if (!findAuthor) {
            return res.redirect("/upload-book" + "author is not found!!");
        }

        if (bookUpload) {
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
};

const deleteBook = async function (req, res, next) {
    try {
        const { authorId, id } = req.params;

        const findBookAndDelete = await BookModel.deleteOne({ _id: id });

        if (!!findBookAndDelete.deletedCount) {
            await authorModel.updateOne({ _id: authorId }, { $pull: { books: { bookId: id } } });
            return res.redirect("/");
        }
    } catch (err) {
        console.log(err);
    }
};

module.exports = {
    uploadBook,
    deleteBook,
};
