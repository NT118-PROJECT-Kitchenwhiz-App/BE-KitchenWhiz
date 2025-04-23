const UserService = require("../services/user_service");


exports.register = async(req, res, next) => {
    try {
        const {email, username, password} = req.body;

        const successRes = await UserService.registerUser(email, username, password);

        res.json({status: true, success: "User Registered Successfully"});
    }
    catch (err) {
        throw err;
    }
}