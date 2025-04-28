const express = require("express");
const body_parser = require("body-parser");
const userRouter = require("./routers/user_router");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');



const app = express();

app.use(body_parser.json());

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/api/user', userRouter);

module.exports = app;