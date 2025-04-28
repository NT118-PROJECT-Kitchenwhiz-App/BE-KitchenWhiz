const router = require("express").Router();
const UserController = require("../controllers/user_controller");

router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.post('/vertifyOtp', UserController.vertifyOtp);
router.post('/forgotPassword', UserController.forgotPassword);
router.post('/resetPassword', UserController.resetPassword);

module.exports = router;