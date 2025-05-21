const UserViewedRecipesModel = require('../models/user_viewed_recipes_model');

class UserViewedRecipesService {
    static async createViewedRecipe(data) {
        try {
            const {user_id, recipe_id, view_at} = data;

            const newItem = new UserViewedRecipesModel({
                user_id,
                recipe_id,
                view_at
            });

            return await newItem.save();
        }
        catch (error) {
            throw error;
        }
    }

    // Kiem tra da ton tai mon an da xem hay chua
    static async viewedRecipeExisted(userId, recipeId) {
        const viewedRecipe = await UserViewedRecipesModel.findOne({user_id: userId, recipe_id: recipeId});

        if (viewedRecipe) return true;
        return false;
    }
}