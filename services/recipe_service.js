const RecipeModel = require("../models/recipe_model");

class RecipeService {

    static async createRecipe(title, imageUrl, imagePublicId) {
        try {
            const recipe = new RecipeModel({
                title, 
                imageUrl,
                imagePublicId
            });
            return await recipe.save();
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = RecipeService;