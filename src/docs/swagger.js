const swaggerJsdoc = require('swagger-jsdoc');
require("dotenv").config();

// ✅ Đặt tên hàm rõ ràng (ví dụ: generateSwaggerSpec)
function generateSwaggerSpec(serverUrl) {
  return swaggerJsdoc({
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'KitchenWhiz API Documentation',
        version: '1.0.0',
        description: 'Swagger API docs for KitchenWhiz project including User and Dish modules',
      },
      servers: [
        {
          url: serverUrl,
        },
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: 'http',
            scheme: 'bearer',
            bearerFormat: 'JWT',
          },
        },
      },
      security: [
        {
          bearerAuth: [],
        },
      ],
    },
    apis: ['./src/routers/*.js'],
  });
}

module.exports = generateSwaggerSpec; // ✅ Xuất ra hàm
