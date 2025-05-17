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

    static async getIngredientId(name) {
        try {
            const ingredient = await IngredientModel.findOne({name});

            if (ingredient) return ingredient._id;
            return null;
        }
        catch (error) {
            throw error;
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