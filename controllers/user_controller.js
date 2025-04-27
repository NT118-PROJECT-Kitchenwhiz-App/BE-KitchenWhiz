const { response } = require("express");
const UserService = require("../services/user_service");


exports.register = async(req, res, next) => {
    try {
        const {email, username, password} = req.body;

        const successRes = await UserService.registerUser(email, username, password);

        res.json({status: true, success: "User Registered Successfully"});
    }
    catch (error) {
        throw error;
    }
}

exports.login = async(req, res, next) => {
    try {
        const {login, password} = req.body;

        const user = await UserService.checkUser(login);

        if (!user) {
            throw new Error("User don't exist");
        }

        const isMatch = await user.comparePassword(password);
        if (isMatch === false) {
            throw new Error("Password don't correnct");
        }
        
        let tokenData = {_id:user._id, email: user.email};

        const token = await UserService.generateToken(tokenData, "secretKey", '1h');

        res.status(200).json({status:true, token:token});
    }
    catch (error) {
        throw error; 
    } 
}