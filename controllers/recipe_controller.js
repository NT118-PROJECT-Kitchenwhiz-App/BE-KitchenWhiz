const mongoose = require("mongoose");

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

exports.getRecipe = async (req, res, next) => {
    try {

        const {id} = req.params;

        const recipeId = new mongoose.Types.ObjectId(id);

        // 1. Lấy recipe chính
        const recipe = await RecipeServie.getRecipe(recipeId);
        if (!recipe) 
            return res.status(404).json({message: "Recipe not found"});

        // 2. Lấy image_id từ recipes_images
        const imageId = await RecipesImagesService.getImgageId(recipeId);
        
        // 3. Lấy image url từ images thông qua id
        const imageUrl = await ImageService.getImageUrl(imageId);

        // 4. Lấy danh sách ingredient thông qua recipeId
        const ingredients = await RecipesIngredientsService.getRecipeIngredients(recipeId);

        // 5. Gộp dữ liệu
        const finalResult = {
            _id: recipe._id,
            title: recipe.title,
            image: imageUrl,
            servings: recipe.servings,
            readyInMinutes: recipe.ready_in_minutes,
            summary: recipe.summary,
            instructions: recipe.instructions,
            ingredients: ingredients
        };
        res.status(201).json(finalResult);
    }
    catch (error) {
        console.error("Error get recipe: ", error);
        res.status(500).json({message: "Internal server error!"});
    }
}

exports.searchByIngredient = async (req, res, next) => {
    try {
        const {name} = req.query;
        console.log(req.query);

        if (!name) {
            return res.status(400).json({message: 'Ingredient name is require'});
        }
        const ingredientId = await IngredientService.getIngredientId(name);
        if (!ingredientId) {
            return res.status(404).json({message: 'Ingredient not found'});
        }

        const recipeIds = await RecipesIngredientsService.getRecipeIdsByIngredientId(ingredientId);

        const result = await Promise.all(recipeIds.map(async (recipeId) => {
            const recipe = await RecipeServie.getRecipe(recipeId);
            const imageId = await RecipesImagesService.getImgageId(recipeId);
            const imageUrl = await ImageService.getImageUrl(imageId);
            return {
                _id: recipe._id,
                title: recipe.title,
                image: imageUrl
            };
        }));

        // console.log(result);
        res.status(201).json(result);

    }
    catch (error) {
        console.error('Error search by ingredient:', error);
        res.status(500).json({error: 'Internal Server Error'});
    }
}