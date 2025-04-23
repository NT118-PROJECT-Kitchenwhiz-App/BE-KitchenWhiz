const UserModel = require("../models/user_model");

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
}

module.exports = UserService;