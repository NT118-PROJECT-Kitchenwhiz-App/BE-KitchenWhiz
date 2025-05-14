const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const user_viewed_recipesSchema = new Schema ({
    user_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    recipe_id: {
        tpye: mongoose.Schema.Types.ObjectId,
        require: true
    },
    view_at: {
        tpye: Date
    }
});

const UserViewedRecipesModel = db.model('user_viewed_recipes', user_viewed_recipesSchema);

module.exports = UserViewedRecipesModel;