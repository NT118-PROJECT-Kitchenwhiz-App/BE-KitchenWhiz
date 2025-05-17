const router = require("express").Router();
const RecipeController = require("../controllers/recipe_controller");
const upload = require("../middleware/multer");

/**
 * @swagger
 * /recipe/addRecipe:
 *   post:
 *     summary: Thêm công thức mới
 *     tags:
 *       - Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - image
 *               - recipeInfo
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *                 description: Hình ảnh đại diện cho công thức
 *               recipeInfo:
 *                 type: string
 *                 description: JSON string chứa thông tin công thức
 *                 example: |
 *                   {
 *                     "title": "Spaghetti Bolognese",
 *                     "servings": 4,
 *                     "readyInMinutes": 45,
 *                     "summary": "A classic Italian pasta dish.",
 *                     "instructions": "1. Heat oil... 2. Add meat...",
 *                     "ingredients": [
 *                       {
 *                         "name": "Spaghetti",
 *                         "amount": 200,
 *                         "unit": "grams"
 *                       },
 *                       {
 *                         "name": "Ground Beef",
 *                         "amount": 300,
 *                         "unit": "grams"
 *                       }
 *                     ]
 *                   }
 *     responses:
 *       201:
 *         description: Tạo công thức thành công
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 messege:
 *                   type: string
 *                   example: Add recipe successful
 *       400:
 *         description: Thiếu hình ảnh
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Image is required
 *       500:
 *         description: Lỗi máy chủ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.post('/addRecipe', upload.single('image'), RecipeController.addRecipe);

module.exports = router;
