const RecipeServie = require("../services/recipe_service");
const {uploadImage} = require("../utilities/cloudinary");

exports.add = async (req, res, next) => {

    try {
        const {title} = req.body;
        const imageFile = req.file;

        if (!imageFile) {
            return res.status(400).json({ message: 'Image is required' });
        }   

        const uploadResult = await uploadImage(imageFile.path);
        const newRecipe = await RecipeServie.createRecipe(title, uploadResult.secure_url, uploadResult.public_id);
        res.status(201).json(newRecipe);
    }
    catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};