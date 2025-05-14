const mongoose = require("mongoose");

const db = require("../config/database");

const { Schema } = mongoose;

const recipeSchema = new Schema ({
    title: {
        type: String,
        require: true
    },
    servings: {
        type: Number,
        require: true
    },
    ready_in_minutes: {
        type: Number,
    },
    summary: {
        type: String,
    },
    intructions: {
        type: String,
    },
    cuisines: {
        type: String
    },
    dish_types: String
})

const RecipeModel = db.model('recipes', recipeSchema);
module.exports = RecipeModel;