const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const user_favorite_recipesSchema = new Schema ({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    recipe_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "recipes",
        required: true
    }
});

const UserFavoriteRecipesModel = db.model('user_favorite_recipes', user_favorite_recipesSchema);

module.exports = UserFavoriteRecipesModel;