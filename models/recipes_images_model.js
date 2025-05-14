const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const recipes_imagesSchema = new Schema({
    recipe_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    image_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

const RecipeImageSchema = db.model('recipes_images', recipes_imagesSchema);

module.exports = RecipeImageSchema;