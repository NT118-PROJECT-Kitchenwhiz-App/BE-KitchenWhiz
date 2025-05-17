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
            return null;
        }
    }

    static async isIngredientExisted(name) {
        const id = await this.getIngredientId(name);
        return id !== null;
    }

}

module.exports = IngredientService;