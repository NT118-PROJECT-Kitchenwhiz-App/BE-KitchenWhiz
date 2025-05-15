const mongoose = require("mongoose");

const db = require("../config/database");

const { Schema } = mongoose;

const recipeSchema = new Schema ({
    title: {
        type: String,
        required: true,
        unique: true
    },
    servings: {
        type: Number,
        required: true
    },
    ready_in_minutes: {
        type: Number,
    },
    summary: {
        type: String,
    },
    instructions: {
        type: String,
    }
});

const RecipeModel = db.model('recipes', recipeSchema);
module.exports = RecipeModel;