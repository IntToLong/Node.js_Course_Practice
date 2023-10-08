"use strict";
const swaggerJsdoc = require('swagger-jsdoc');
const options = {
    failOnErrors: true,
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'SAMPLE API',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server',
            },
        ],
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = swaggerSpec;
//# sourceMappingURL=swaggerConfig.js.map