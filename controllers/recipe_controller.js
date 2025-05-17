const RecipeServie = require("../services/recipe_service");
const ImageService = require("../services/image_service");
const IngredientService = require("../services/ingredient_service");
const RecipesIngredientsService = require("../services/recipes_ingredients_service");
const RecipesImagesService = require("../services/recipes_images_service");

const {uploadImage} = require("../utilities/cloudinary");

exports.addRecipe = async (req, res, next) => {
    try {
        // 1. Lay thong tin
        const { recipeInfo } = req.body;
        const parsedRecipeInfo = JSON.parse(recipeInfo); // 👈 Parse string to object

        const { 
            title, 
            servings, 
            readyInMinutes, 
            summary, 
            instructions, 
            ingredients
        } = parsedRecipeInfo;

        const imageFile = req.file;
        // 2. Them image vao database
        if (!imageFile) {
            return res.status(400).json({ message: 'Image is required' });
        }   
        
        const uploadResult = await uploadImage(imageFile.path);

        const imageInfo = {
            image_url: uploadResult.secure_url.toString()
        }
        await ImageService.createImage(imageInfo);

        const imageId = await ImageService.getImageId(uploadResult.secure_url.toString());

        await RecipeServie.createRecipe({title, servings, readyInMinutes, summary, instructions});
        const recipeId = await RecipeServie.getRecipeId(title);

        // 4. Them ingredient vao database
        if (ingredients && Array.isArray(ingredients)) {
            for (const ingredient of ingredients) {
                const {name, amount, unit} = ingredient;

                const existed = await IngredientService.isIngredientExisted(name);
                if (!existed) {
                    await IngredientService.createIngredient(name);
                }

                const ingredientId = await IngredientService.getIngredientId(name);

                await RecipesIngredientsService.createRecipesIngrident({
                    recipe_id: recipeId,
                    ingredient_id: ingredientId,
                    amount,
                    unit
                });
            }
        }


        // 5. Them recipes_images
        await RecipesImagesService.createRecipeImage({recipe_id: recipeId, image_id: imageId});

        res.status(201).json({messege: "Add recipe successful"});
    }
    catch (error) {
        console.error('Error creating recipe:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};