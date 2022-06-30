const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const JWT_TOKEN = process.env.JWT_TOKEN;
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new Schema({
    name: { type: String, required: [true, "please enter the user name"] },
    email: { type: String, required: [true, "please enter the user email"] },
    password: { type: String, required: [true, "please enter the user password"] },
    tokens: [{ token: { type: String, required: [true, "user token is required"] } }],
});

userSchema.methods.genrateUserToken = async function () {
    try {
        const token = jwt.sign({ _id: this._id.toString(), name: this.name, email: this.email }, JWT_TOKEN);
        this.tokens = this.tokens.concat({ token });
        this.save();
        return token;
    } catch (err) {
        console.log(err);
    }
};

userSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {
            const hashpassword = await bcryptjs.hash(this.password, 11);
            this.password = hashpassword;
        }
    } catch (err) {
        console.log(err);
    }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
