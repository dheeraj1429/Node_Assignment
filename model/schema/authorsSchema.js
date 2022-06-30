const mongoose = require("mongoose");
const authorsSchema = mongoose.Schema;

const authors = new authorsSchema({
    name: { type: String, required: [true, "plase enter the auther name"] },
    age: { type: Number, required: [true, "plase enter the authore age"] },
    dob: { type: String, required: [true, "plase enter the author date of birth"] },
    books: [{ bookId: { type: mongoose.Types.ObjectId, ref: "book" } }],
});

const authorModel = mongoose.model("author", authors);

module.exports = authorModel;
