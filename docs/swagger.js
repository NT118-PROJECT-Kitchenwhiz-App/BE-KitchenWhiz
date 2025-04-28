const swaggerJsdoc = require('swagger-jsdoc');
require("dotenv").config();

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'KitchenW API Documentation',
      version: '1.0.0',
      description: 'Swagger API docs for KitchenW project including User and Dish modules',
    },
    servers: [
      {
        url: `http://localhost:${process.env.PORT}/api`, 
      },
    ],
    components: {
      schemas: {
        UserRegistration: {
          type: 'object',
          required: ['email', 'username', 'password'],
          properties: {
            email: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string', format: 'password' },
          },
        },
        UserLogin: {
          type: 'object',
          required: ['login', 'password'],
          properties: {
            login: { type: 'string' },
            password: { type: 'string', format: 'password' },
          },
        },
        VerifyOtp: {
          type: 'object',
          required: ['email', 'otpCode'],
          properties: {
            email: { type: 'string' },
            otpCode: { type: 'string' },
          },
        },
        ForgotPassword: {
          type: 'object',
          required: ['email'],
          properties: {
            email: { type: 'string' },
          },
        },
        ResetPassword: {
          type: 'object',
          required: ['email', 'newPassword'],
          properties: {
            email: { type: 'string' },
            newPassword: { type: 'string', format: 'password' },
          },
        },
        // DishCreate: {
        //   type: 'object',
        //   required: ['name', 'description', 'price'],
        //   properties: {
        //     name: { type: 'string' },
        //     description: { type: 'string' },
        //     price: { type: 'number' },
        //     imageUrl: { type: 'string' },
        //   },
        // },
        // DishUpdate: {
        //   type: 'object',
        //   properties: {
        //     name: { type: 'string' },
        //     description: { type: 'string' },
        //     price: { type: 'number' },
        //     imageUrl: { type: 'string' },
        //   },
        // },
      },
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      bearerAuth: [],
    }],
  },
  apis: ['./routers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
