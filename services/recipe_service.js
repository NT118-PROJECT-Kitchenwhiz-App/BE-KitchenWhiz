const RecipeModel = require("../models/recipe_model");

class RecipeService {

    static async createRecipe(recipeInfo) {
        try {
            const {
                title,
                servings,
                ready_in_minutes,
                summary,
                instructions
            } = recipeInfo;

            const recipe = new RecipeModel({
                title,
                servings,
                ready_in_minutes : ready_in_minutes,
                summary,
                instructions
            });

            return await recipe.save();
        }
        catch (error) {
            throw error;
        }
    }

    static async getRecipeId(title) {
        try {
            const recipe = await RecipeModel.findOne({title});
            if (recipe) {
                return recipe._id;
            }
            else return null;
        }
        catch (error) {
            throw error;
        }
    }

    static async getRecipe(recipeId) {
        try {
            const recipe = await RecipeModel.findOne({_id: recipeId}).lean();
            if (recipe) return recipe;
            return null;
        }
        catch (error) {
            throw (error);
        }
    }
}

module.exports = RecipeService;