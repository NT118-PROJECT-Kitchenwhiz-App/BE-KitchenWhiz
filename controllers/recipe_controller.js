const RecipeServie = require("../services/recipe_service");
const ImageService = require("../services/image_service");
const IngredientService = require("../services/ingredient_service");
const RecipesIngredientsService = require("../services/recipes_ingredients_service");
const RecipesImagesService = require("../services/recipes_images_service");

const {uploadImage} = require("../utilities/cloudinary");

exports.addRecipe = async (req, res, next) => {
    try {
        // 1. Lay thong tin
        const {recipeInfo} = req.body;
        const imageFile = req.file;

        // 2. Them image vao database
        if (!imageFile) {
            return res.status(400).json({ message: 'Image is required' });
        }   

        const uploadResult = await uploadImage(imageFile.path);

        const imageInfo = {
            url: uploadResult.secure_url, 
            public_id: uploadResult.public_id
        }
        await ImageService.createImage(imageInfo);

        const imageId = await ImageService.getImageId(url);

        // 3. Them recipe vao database
        const { 
            title, 
            servings, 
            readyInMinutes, 
            summary, 
            instructions, 
            ingredients
        } = recipeInfo;

        await RecipeServie.createRecipe({title, servings, readyInMinutes, summary, instructions});
        const recipeId = await RecipeServie.getRecipeId(title);

        // 4. Them ingredient vao database
        if (ingredients && Array.isArray(ingredients)) {
            ingredients.forEach(async ingredient => {
                const {name, amount, unit} = ingredient;

                if (IngredientService.isIngredientExisted(name) == false)
                    await IngredientService.createIngredient(name);
                const ingredientId = IngredientService.getIngredientId(name);

                await RecipesIngredientsService.createRecipesIngrident({
                    recipeId,
                    ingredientId,
                    amount,
                    unit
                })

            });
        }

        // 5. Them recipes_images
        await RecipesImagesService.createRecipeImage({recipeId, imageId});

        res.status(201).json({messege: "Add recipe successful"});
    }
    catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};