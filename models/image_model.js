const mongoose = require("mongoose");

const db = require("../config/database");

const {Schema} = mongoose;

const imageSchema = new Schema ({
    filename: {
        type: String,
        require: true,
    },
    image_url: {
        tpye: String,
        require:true,
    },
    image_public_id: {
        type: String,
        require: true
    }
});

const ImageModel = db.model.Schema('images', imageSchema);

module.exports = ImageModel;