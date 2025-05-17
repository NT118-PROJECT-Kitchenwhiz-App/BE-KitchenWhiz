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

/**
 * @swagger
 * /recipe/searchByIngredient:
 *   get:
 *     summary: Tìm món ăn theo tên thành phần
 *     tags:
 *       - Recipes
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: Tên thành phần (ingredient) cần tìm
 *     responses:
 *       200:
 *         description: Danh sách món ăn chứa thành phần đó
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   image:
 *                     type: string
 *       404:
 *         description: Không tìm thấy thành phần
 *       500:
 *         description: Lỗi máy chủ
 */

router.get('/searchByIngredient', RecipeController.searchByIngredient);

/**
 * @swagger
 * /recipe/{id}:
 *   get:
 *     summary: Lấy thông tin công thức theo ID
 *     tags:
 *       - Recipes
 *     parameters:
 *       - name: id
 *         in: path
 *         description: ID của công thức
 *         required: true
 *         schema:
 *           type: string
 *           example: 6653a1b8f2e3e6b0e32e94ab
 *     responses:
 *       200:
 *         description: Trả về thông tin chi tiết công thức
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                   example: 6653a1b8f2e3e6b0e32e94ab
 *                 title:
 *                   type: string
 *                   example: Vietnamese Pho
 *                 image:
 *                   type: string
 *                   example: https://spoonacular.com/recipeImages/654959-556x370.jpg
 *                 servings:
 *                   type: integer
 *                   example: 2
 *                 readyInMinutes:
 *                   type: integer
 *                   example: 90
 *                 summary:
 *                   type: string
 *                   example: Vietnamese Pho is a Vietnamese main course.
 *                 instructions:
 *                   type: string
 *                   example: Boil beef bones for 4 hours... Add spices...
 *                 ingredients:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: 10023572
 *                       name:
 *                         type: string
 *                         example: beef bones
 *                       amount:
 *                         type: number
 *                         example: 2
 *                       unit:
 *                         type: string
 *                         example: pounds
 *       404:
 *         description: Không tìm thấy công thức
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Recipe not found
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

router.get('/:id', RecipeController.getRecipe);



module.exports = router;
