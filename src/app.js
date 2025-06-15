const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./routers/user_router");
const recipeRouter = require("./routers/recipe_router");
const factRouter = require("./routers/facts_router");
const swaggerUi = require('swagger-ui-express');
const generateSwaggerSpec = require('./docs/swagger');
const path = require("path");
const cors = require('cors');
require("dotenv").config();



const app = express();
app.use(cors());

app.use(body_parser.json());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api/user', userRouter);
app.use('/api/recipe', recipeRouter); 
app.use('/api/fact', factRouter);
app.use('/api-docs', swaggerUi.serve, (req, res) => {
  const protocol = req.protocol;
  const host = req.get('host');
  const baseUrl = `${protocol}://${host}/api`;

  const swaggerSpec = generateSwaggerSpec(baseUrl); // 🧠 Tạo spec động theo IP/host thực tế

  res.send(swaggerUi.generateHTML(swaggerSpec)); // 🧩 Trả HTML đã render sẵn
});

module.exports = app;