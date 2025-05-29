const router = require("express").Router();
const FactController = require("../controllers/fact_controller");
const authenticateToken = require("../middleware/auth");

/**
 * @swagger
 * /fact/createFact:
 *   post:
 *     summary: Create a new fact
 *     description: Creates a new fact with the provided quote.
 *     tags:
 *       - Facts
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quote
 *             properties:
 *               quote:
 *                 type: string
 *                 example: "Đồ uống ngọt có thể gây mất trí nhớ"
 *     responses:
 *       200:
 *         description: Fact added successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Add Fact Successfully
 *       400:
 *         description: Missing quote in request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Quote is required
 *       500:
 *         description: Internal Server Error
 */

router.post('/createFact', authenticateToken, FactController.createFact);

/**
 * @swagger
 * /fact/getRandomFact:
 *   get:
 *     summary: Get a random fact
 *     description: Returns a randomly selected fact from the database.
 *     tags:
 *       - Facts
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A random fact was successfully retrieved
 *         content:
 *           application/json:
 *             schema:
 *               type: string
 *               example: "Đồ uống ngọt có thể gây mất trí nhớ"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Internal Server Error
 */
router.get('/getRandomFact', authenticateToken, FactController.randomFact);

module.exports = router;