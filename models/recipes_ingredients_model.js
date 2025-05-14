const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const recipes_ingredientsSchema = new Schema({
    recipe_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    ingredient_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    amount: Number,
    unit: String
});

const RecipesIngredientsSchema = db.model('recipes_ingredients', recipes_ingredientsSchema);

module.exports = RecipesIngredientsSchema;