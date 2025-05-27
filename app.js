const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./routers/user_router");
const recipeRouter = require("./routers/recipe_router");
const factRouter = require("./routers/facts_router");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');
const cors = require('cors');
require("dotenv").config();



const app = express();

app.use(body_parser.json());

app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter); 
app.use('/api/fact', factRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));  


module.exports = app;