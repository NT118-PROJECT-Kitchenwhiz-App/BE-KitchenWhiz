const IngredientModel = require("../models/ingredient_model");

class IngredientService {
    static async createIngredient(name) {
        try {
            const newIngredient = new IngredientModel({name});
            return await newIngredient.save();
        }
        catch (error) {
            throw error;
        }
    }

    static async getIngredientsByName(name) {
        try {
            const ingredients = await IngredientModel.find({ 
                name: { $regex: name, $options: 'i' } // Case-insensitive search
            });

            // Remove duplicate IDs using a Set
            const uniqueIngredients = [...new Map(ingredients.map(ingredient => [ingredient._id.toString(), ingredient])).values()];

            return uniqueIngredients.map(ingredient => ({
                _id: ingredient._id,
                name: ingredient.name
            }));
        } catch (error) {
            console.log("Ingredient Service Error", error);
        }
    }

    static async isIngredientExisted(name) {
        const id = await this.getIngredientId(name);
        return id !== null;
    }

    static async getIngredient(ingredientId) {
        const ingredient = await IngredientModel.findOne({_id: ingredientId});
        if (ingredient) 
            return ingredient;
        return null;
    }


}

module.exports = IngredientService;