const router = require("express").Router();
const UserController = require("../controllers/user_controller");

/**
 * @swagger
 * tags:
 *   name: User
 *   description: Các API liên quan tới User
 */

/**
 * @swagger
 * /user/registration:
 *   post:
 *     summary: Đăng ký tài khoản mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserRegistration'
 *     responses:
 *       200:
 *         description: Đăng ký thành công
 *       400:
 *         description: Lỗi đăng ký
 */
router.post('/registration', UserController.register);

/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Đăng nhập tài khoản
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLogin'
 *     responses:
 *       200:
 *         description: Đăng nhập thành công
 *       400:
 *         description: Sai thông tin đăng nhập
 */
router.post('/login', UserController.login);

/**
 * @swagger
 * /user/vertifyOtp:
 *   post:
 *     summary: Xác thực OTP
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOtp'
 *     responses:
 *       200:
 *         description: OTP đúng
 *       400:
 *         description: OTP sai
 */
router.post('/vertifyOtp', UserController.vertifyOtp);

/**
 * @swagger
 * /user/forgotPassword:
 *   post:
 *     summary: Yêu cầu quên mật khẩu
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ForgotPassword'
 *     responses:
 *       200:
 *         description: Đã gửi OTP qua email
 *       400:
 *         description: Email không tồn tại
 */
router.post('/forgotPassword', UserController.forgotPassword);

/**
 * @swagger
 * /user/resetPassword:
 *   post:
 *     summary: Đặt lại mật khẩu mới
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ResetPassword'
 *     responses:
 *       200:
 *         description: Reset mật khẩu thành công
 *       400:
 *         description: OTP không hợp lệ hoặc lỗi khác
 */

router.post('/resetPassword', UserController.resetPassword);

/**
 * @swagger
 * /user/addFavoriteRecipes:
 *   post:
 *     summary: Add a favorite recipe for a user
 *     tags:
 *       - User_Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - recipeId
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "665e2d1c7b7d5a6f1d234567"
 *               recipe_id:
 *                 type: string
 *                 example: "665e2d1c7b7d5a6f1d289012"
 *     responses:
 *       200:
 *         description: Add favorite recipe successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Add favorite recipe successfully
 *       400:
 *         description: Recipe already added
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Had added before
 *       404:
 *         description: User or Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal server error
 */
router.post('/addFavoriteRecipes', UserController.addFavoriteRecipe);

/**
 * @swagger
 * /user/allFavoriteRecipes/{user_id}:
 *   get:
 *     summary: Get all favorite recipes of a user
 *     tags:
 *       - User_Recipes
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         description: ID của người dùng
 *         schema:
 *           type: string
 *           example: "662fa7d3cbe8f8a9e8c0d9f1"
 *     responses:
 *       200:
 *         description: List of favorite recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     description: ID of the recipe
 *                     example: "6630c4d5123e4c34a8f2b9d2"
 *                   title:
 *                     type: string
 *                     description: Title of the recipe
 *                     example: "Spaghetti Bolognese"
 *                   image:
 *                     type: string
 *                     description: URL of the recipe's image
 *                     example: "https://example.com/images/spaghetti.jpg"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/allFavoriteRecipes/:user_id', UserController.getAllFavoriteRecipes);


/**
 * @swagger
 * /user/{user_id}/favoriteRecipe/{recipe_id}:
 *   delete:
 *     tags:
 *       - User_Recipes
 *     summary: Delete a user's favorite recipe
 *     description: Xóa công thức yêu thích của người dùng dựa vào user_id và recipe_id từ URL.
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của người dùng
 *       - in: path
 *         name: recipe_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID của công thức cần xóa khỏi danh sách yêu thích
 *     responses:
 *       200:
 *         description: Xóa thành công hoặc công thức đã bị xóa trước đó
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Removed favorite recipe successfully
 *       404:
 *         description: Không tìm thấy người dùng hoặc công thức
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       400:
 *         description: Công thức yêu thích đã được loại bỏ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Recipe already removed
 *       500:
 *         description: Lỗi máy chủ nội bộ
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

router.delete('/:user_id/favoriteRecipe/:recipe_id', UserController.deleteFavoriteRecipe);

/**
 * @swagger
 * /user/addViewedRecipes:
 *   post:
 *     summary: Add or update a viewed recipe for a user
 *     tags:
 *       - User_Recipes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 example: "665a57b9c2a7b3f5448be119"
 *                 description: MongoDB ObjectId of the user
 *               recipe_id:
 *                 type: string
 *                 example: "665a5aa7c2a7b3f5448be21d"
 *                 description: MongoDB ObjectId of the recipe
 *             required:
 *               - user_id
 *               - recipe_id
 *     responses:
 *       200:
 *         description: Successfully updated the view time of a recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Updated view time for recipe
 *       201:
 *         description: Successfully added a new viewed recipe
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Added new viewed recipe
 *       404:
 *         description: User or Recipe not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: User not found
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Internal Server Error
 */

router.post('/addViewedRecipes', UserController.addViewedRecipe);

/**
 * @swagger
 * /user/allViewRecipes/{user_id}:
 *   get:
 *     summary: Get all viewed recipes by a user
 *     tags:
 *       - User_Recipes
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: MongoDB ObjectId of the user
 *         example: "665a57b9c2a7b3f5448be119"
 *     responses:
 *       200:
 *         description: List of viewed recipes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                     example: "665a5aa7c2a7b3f5448be21d"
 *                   title:
 *                     type: string
 *                     example: "Delicious Pancakes"
 *                   image:
 *                     type: string
 *                     example: "https://yourdomain.com/images/recipe1.jpg"
 *                   view_at:
 *                     type: string
 *                     format: date-time
 *                     example: "2024-05-23T14:30:00Z"
 *       404:
 *         description: User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "User not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get('/allViewRecipes/:user_id', UserController.getAllViewedRecipes);

module.exports = router;