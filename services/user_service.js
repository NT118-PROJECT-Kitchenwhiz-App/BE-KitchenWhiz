const UserModel = require("../models/user_model");
const jwt = require("jsonwebtoken");
const cache = require("../utilities/cache");

class UserService {

    static async registerUser(email, username, password) {
        try {
            const createUser = new UserModel({email, username, password});
            return await createUser.save();
        } 
        catch (err) {
            throw err;
        }
    }

    static async updatePassword(email, newPassword) {
        try {
            const user = await UserModel.findOne({email});
            if (!user) {
                throw new Error("User not found");
            }
            user.password = newPassword;
            await user.save();
        }
        catch (error) {
            throw error;
        }
    }

    static async checkUser(login) {
        try {
            let query = {};

            if (login.includes('@')) {
                query = {email: login};
            }
            else {
                query = {username: login};
            }
            const user = await UserModel.findOne(query);

            return user;
        }
        catch (error) {
            throw error;
        }
    }

    static async generateToken(tokenData, secretKey, jwt_expire) {
        return jwt.sign(tokenData, secretKey, {expiresIn:jwt_expire});
    }
}

module.exports = UserService;