const router = require("express").Router();
const UserController = require("../controllers/user_controller");

router.post('/registration', UserController.register);
router.post('/login', UserController.login);
router.post('/vertifyOtp', UserController.vertifyOtp);

module.exports = router;