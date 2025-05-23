const UserFavoriteRecipesModel = require('../models/user_favorite_recipes_model');
const mongoose = require("mongoose");

class UserFavoriteRecipesService {
    static async createFavoriteRecipe (data) {
        try {
            const {user_id, recipe_id} = data;

            const newItem = new UserFavoriteRecipesModel({
                user_id,
                recipe_id
            });

            return await newItem.save();
        }
        catch (error) {
            throw error;
        }
    }
    // Kiem tra xem mon an do da duoc thich hay chua
    static async favoriteRecipeExisted (userId, recipeId) {
        const favoriteRecipe = await UserFavoriteRecipesModel.findOne({user_id: userId, recipe_id: recipeId});
        if (favoriteRecipe) return true;
        return false;
    }

    // Lay cac recipe_id boi user_id
    static async getRecipeIdsByUserId (userId) {
        const recipes = await UserFavoriteRecipesModel.find({user_id: userId}).lean();

        if (!recipes) return [];

        const recipeIds = recipes.map(recipe => {
            try {
                return new mongoose.Types.ObjectId(recipe.recipe_id);
            }
            catch {
                console.warn("Invalid ObjectId in recipe_id:", ri.recipe_id);
                return null;
            }
        }).filter(id => id !== null);

        return recipeIds;
    }

    // Xoa mon an yeu thich dua tren recipe_id va user_id
    static async deleteFavoriteRecipes(userId, recipeId) {

        try {
            const deletedRecipe = await UserFavoriteRecipesModel.findOneAndDelete({user_id: userId, recipe_id: recipeId});
 
            if (deletedRecipe) {
                return deletedRecipe;
            }
            return null;
        }
        catch (error) {
            console.log(error);
            throw new Error("Failed to delete favorite recipe");
        }
    }
}

module.exports = UserFavoriteRecipesService;