const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const user_favorite_recipesSchema = new Schema ({
    user_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    recipe_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    }
});

const UserFavoriteRecipesModel = db.model('user_favorite_recipes', user_favorite_recipesSchema);

module.exports = UserFavoriteRecipesModel;