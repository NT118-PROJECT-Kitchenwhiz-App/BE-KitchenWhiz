const { response } = require("express");
const UserService = require("../services/user_service");
const OtpCacheService = require("../services/otp_cache_service");
const sendOtpEmail = require("../utilities/mailer");

// Registation API
exports.register = async(req, res, next) => {
    try {
        const {email, username, password} = req.body;

        // 1. Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000);

        // 2. Save user data + OTP to cache
        await OtpCacheService.saveOtp(email, {username, password, otpCode, action: "register"});

        // 3. Send OTP via email
        await sendOtpEmail(email, otpCode);

        res.json({status: true, success: "User Registered. Please verify OTP sent to your email."});
    }
    catch (error) {
        next(error);
    }
}

// Login API
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

// Forgot Password API
exports.forgotPassword = async (req, res, next) => {
    try {
        const {email} = req.body;

        // 1. Check user is esxited
        const user = await UserService.checkUser(email);
        if (!user) {
            return res.status(404).json({status: false, message: "User not found."});
        }

        // 2. Generate OTP
        const otpCode = Math.floor(100000 + Math.random() * 900000);

        // 3. Save OTP
        await OtpCacheService.saveOtp(email, {otpCode, action: "forgotPassword"});

        // 4. Send OTP mail
        await sendOtpEmail(email, otpCode);

        res.json({status: true, success: "User Forgot Password. Please verify OTP sent to your email."});
    }
    catch (error) {
        next(error);
    }
}

// Reset Password API
exports.resetPassword = async (req, res, next) => {
    try {
        const {email, newPassword} = req.body;

        await UserService.updatePassword(email, newPassword);
        
        res.json({status: true, message: "Password reset successfully"});

    }
    catch (error) {
        next(error);
    }
}

// Vertify API
exports.vertifyOtp = async(req, res, next) => {
    try {
        const {email, otpCode} = req.body;

        // 1. Get user info + OTP from cache
        const cachedData = await OtpCacheService.getOtp(email);

        if (!cachedData) {
            return res.status(400).json({status: false, message: "OTP expired or invalid"});
        }

        if (cachedData.otpCode.toString() !== otpCode.toString()) {
            return res.status(400).json({status: false, message: "Incorrect OTP"});
        } 

        // 2. Save user to database if action is register
        if (cachedData.action === "register") {
            const {username, password} = cachedData;
            await UserService.registerUser(email, username, password);
            res.json({status: true, message: "OTP Verified and User Registered Successfully"});
        }
        else if (cachedData.action === "forgotPassword") {
            res.json({ status: true, message: "OTP Verified and please send new password" });
        }
        else {
            return res.status(400).json({ status: false, message: "Invalid action type" });
        }

        // 3. Delete cache after successful vertification
        await OtpCacheService.deleteOtp(email);
        res.json({status: true, message: "OTP Verified and User Registered Successfully"});
    }
    catch (error) {
        next(error);
    }
}