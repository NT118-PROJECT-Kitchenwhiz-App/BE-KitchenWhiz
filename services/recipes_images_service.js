const RecipesImagesModel = require("../models/recipes_images_model");

class RecipesImagesService {
    static async createRecipeImage(data) {
        try {
            const {recipe_id, image_id} = data;
            const newItem = new RecipesImagesModel({
                recipe_id,
                image_id
            });

            return await newItem.save();
        }
        catch (error) {
            throw error;
        }
    }
}

module.exports = RecipesImagesService;