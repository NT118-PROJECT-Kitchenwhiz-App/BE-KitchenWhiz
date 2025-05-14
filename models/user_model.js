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
    },
    token: String,
    refreshToken: String
});

userSchema.pre("save", async function() {
    try {
        var user = this;
        const salt = await(bcrypt.genSalt(10));
        const hashpass = await bcrypt.hash(user.password, salt);
        user.password = hashpass;
    }
    catch (error) {
        throw error;
    }
});

userSchema.methods.comparePassword = async function (userPassword) {
    try {
        const isMatch = await bcrypt.compareSync(userPassword, this.password);
        return isMatch;
    }
    catch (error) {
        throw error;
    }
}

const UserModel = db.model('users', userSchema);

module.exports = UserModel;
