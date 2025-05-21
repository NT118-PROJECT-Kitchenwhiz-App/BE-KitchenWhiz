const UserFavoriteRecipesModel = require('../models/user_favorite_recipes_model');

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
        const favoriteRecipe =  UserFavoriteRecipesModel.findOne({user_id: userId, recipe_id: recipeId});

        if (favoriteRecipe) return true;
        return false;
    }
}

module.exports = UserFavoriteRecipesService;