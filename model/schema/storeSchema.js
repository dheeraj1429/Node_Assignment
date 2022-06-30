const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: { type: String, required: [true, "book name is required"] },
    image: { type: String, required: [true, "image is require"] },
    published: { type: String, required: [true, "Published date is required"] },
    price: { type: Number, required: [true, "book price is required"] },
    author: { type: mongoose.Types.ObjectId, required: [true, "author is required"], ref: "author" },
});

const BookModel = mongoose.model("book", bookSchema);

module.exports = BookModel;
