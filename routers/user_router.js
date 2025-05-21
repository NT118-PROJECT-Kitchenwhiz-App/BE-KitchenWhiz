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

// router.post('/addFavoriteRecipes', UserController.addFavoriteRecipe);

// router.post('/addViewedRecipes', UserController.addViewedRecipe);

// router.get('/allFavoriteRecipes', UserController.allFavoriteRecipes);

// router.get('/allViewRecipes', UserController.allViewedRecipes);

// router.delete('/deletefavoriteRecipe', UserController.deleteFavoriteRecipe);

module.exports = router;