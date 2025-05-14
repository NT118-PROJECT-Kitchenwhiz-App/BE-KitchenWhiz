const router = require("express").Router();
const RecipeController = require("../controllers/recipe_controller");
const upload = require("../middleware/multer");

router.post('/addRecipe', upload.single('image'), RecipeController.add);

module.exports = router;
