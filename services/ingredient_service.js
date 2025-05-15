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

    static async isIngredientExisted(name) {
        if (getIngredientId(name) == null) return false;
        return true; 
    }

    static async getIngredientId(name) {
        try {
            const ingredient = IngredientModel.findOne({name});

            if (ingredient) return ingredient._id;
            return null;
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = IngredientService;