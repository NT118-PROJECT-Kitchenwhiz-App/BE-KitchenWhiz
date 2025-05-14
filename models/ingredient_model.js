const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const ingredientSchema = new Schema({
    name: String,
    category: String
});

const IngredientModel = db.model.db('ingredients', ingredientSchema);
module.exports = IngredientModel;