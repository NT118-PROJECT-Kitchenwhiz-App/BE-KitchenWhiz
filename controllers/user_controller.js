const { response } = require("express");
const UserService = require("../services/user_service");
const UserFavoriteRecipesService = require('../services/user_favorite_recipes_service');
const UserViewedRecipesService = require('../services/user_viewed_recipes_service');
const ImageService = require("../services/image_service");
const RecipeService = require("../services/recipe_service");
const RecipesImagesService = require("../services/recipes_images_service");
const OtpCacheService = require("../services/otp_cache_service");
const sendOtpEmail = require("../utilities/mailer");
const mongoose = require('mongoose');

// Registation API
exports.register = async(req, res, next) => {
    try {
        const {email, username, password} = req.body;

        const existingEmailUser = await UserService.checkUser(email);
        if (existingEmailUser) {
            return res.status(400).json({ status: false, message: "Email is already registered." });
        }

        const existingUsernameUser = await UserService.checkUser(username);
        if (existingUsernameUser) {
            return res.status(400).json({ status: false, message: "Username is already taken." });
        }

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

        // Refresh token (expires in 7 days)
        const refreshToken = await UserService.generateToken(tokenData, "secretKey", '7d');

        res.status(200).json({
            status: true,
            _id: user._id,
            email: user.email,
            username: user.username,
            token: token,
            refreshToken: refreshToken
        });
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

// Add Favorite Recipe
exports.addFavoriteRecipe = async(req, res, next) => {
    try {
        let {user_id, recipe_id} = req.body;
        user_id = new mongoose.Types.ObjectId(user_id);
        recipe_id = new mongoose.Types.ObjectId(recipe_id);
        
        if (!await UserService.checkUserById(user_id)) {
            return res.status(404).json({error: "User not found"});
        }

        if (!await RecipeService.getRecipe(recipe_id)) {
            return res.status(404).json({error: "Recipe not found"});
        }

        const favoriteExisted = await UserFavoriteRecipesService.favoriteRecipeExisted(user_id, recipe_id);
        if (favoriteExisted) {
            return res.status(400).json({error: "Recipe already added"})
        }

        await UserFavoriteRecipesService.createFavoriteRecipe({user_id, recipe_id});
        await RecipeService.incrementLikes(recipe_id);
        res.status(200).json({message: "Add favorite recipe successfully"});
    }
    catch (error) {
        console.log("Add Favorite Recipe: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Get all favorite recipes for the user
exports.getAllFavoriteRecipes = async(req, res, next) => {
    try {
        let {user_id} = req.params;

        user_id = new mongoose.Types.ObjectId(user_id);

        if (!await UserService.checkUserById(user_id)) {
            return res.status(404).json({error: "User not found"});
        }

        // Lay danh sach recipeIds
        const recipeIds = await UserFavoriteRecipesService.getRecipeIdsByUserId(user_id);

        const result = await Promise.all(recipeIds.map(async (recipeId) => {
            const recipe = await RecipeService.getRecipe(recipeId);
            const imageId = await RecipesImagesService.getImageId(recipeId);
            const imageUrl = await ImageService.getImageUrl(imageId);
            return {
                _id: recipe._id,
                title: recipe.title,
                image: imageUrl,
                likes: recipe.likes
            };
        }));
        
        res.status(200).json(result);
    }
    catch (error) {
        console.log("Get All Favorite Recipes Error: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Delete favorite recipe
exports.deleteFavoriteRecipe = async (req, res, next) => {
    try {

        let {user_id, recipe_id} = req.params;
        user_id = new mongoose.Types.ObjectId(user_id);
        recipe_id = new mongoose.Types.ObjectId(recipe_id);

        if (!await UserService.checkUserById(user_id)) {
            return res.status(404).json({error: "User not found"});
        }

        if (!await RecipeService.getRecipe(recipe_id)) {
            return res.status(404).json({error: "Recipe not found"});
        }

        if (await UserFavoriteRecipesService.favoriteRecipeExisted(user_id, recipe_id)) {
            await UserFavoriteRecipesService.deleteFavoriteRecipes(user_id, recipe_id);
            await RecipeService.decrementLikes(recipe_id);
            return res.status(200).json({message: "Remove favorite recipe successfully"});
        }
        
        res.status(400).json({message: "Recipe already removed"});

    }
    catch (error) {
        console.log("Delete Favorite Recipe Error: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Add viewed viewed recipe
exports.addViewedRecipe = async (req, res, next) => {
    try {
        let {user_id, recipe_id} = req.body;

        user_id = new mongoose.Types.ObjectId(user_id);
        recipe_id = new mongoose.Types.ObjectId(recipe_id);

        if (!await UserService.checkUserById(user_id)) {
            return res.status(404).json({error: "User not found"});
        }

        if (!await RecipeService.getRecipe(recipe_id)) {
            return res.status(404).json({error: "Recipe not found"});
        }

        let viewedRecipes = await UserViewedRecipesService.viewedRecipeExisted(user_id, recipe_id);
        if (viewedRecipes) {
            // Nếu đã xem, cập nhật thời gian
            await UserViewedRecipesService.updateNewTimeView(user_id, recipe_id);
            return res.status(200).json({ message: "Updated view time for recipe" });
        } else {
            // Nếu chưa xem, thêm mới
            const newEntry = await UserViewedRecipesService.createViewedRecipe({ user_id, recipe_id });

            if (!newEntry) {
                return res.status(500).json({ error: "Failed to add viewed recipe" });
            }
            return res.status(201).json({ message: "Added new viewed recipe" });
        }

    }
    catch (error) {
        console.log("Delete Favorite Recipe Error: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

// Get All Viewed Recipe
exports.getAllViewedRecipes = async(req, res, next) => {
    try {
        let {user_id} = req.params;

        user_id = new mongoose.Types.ObjectId(user_id);

        console.log(user_id);
        if (!await UserService.checkUserById(user_id)) {
            return res.status(404).json({error: "User not found"});
        }

        // Lay danh sach recipeIds
        const recipeIds = await UserViewedRecipesService.getViewedRecipesByUserId(user_id);

        const result = await Promise.all(recipeIds.map(async (recipeId) => {
            const recipe = await RecipeService.getRecipe(recipeId.recipe_id);
            const imageId = await RecipesImagesService.getImageId(recipeId.recipe_id);
            const imageUrl = await ImageService.getImageUrl(imageId);
            if (recipe) {
                return {
                _id: recipe._id,
                title: recipe.title,
                image: imageUrl,
                view_at: recipeId.view_at
            };
            }
        }));
        
        res.status(200).json(result);
    }
    catch (error) {
        console.log("Get All Favorite Recipes Error: ", error);
        res.status(500).json({error: "Internal Server Error"});
    }
}

