const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const db = require("../config/database");

const { Schema } = mongoose;



const userSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    },
    username: {
        type:String,
        lowercase: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function() {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);
        user.password = hashpass;
    }
    catch (err) {
        throw err;
    }
})

const UserModel = db.model('users', userSchema);

module.exports = UserModel;
