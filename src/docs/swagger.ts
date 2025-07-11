import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TRY-EXPRESS',
      version: '1.0.0',
    },
  },
  apis: ['src/routes/*.ts', 'src/docs/schemas.yaml'],
};

export const swaggerSpec = swaggerJsdoc(options);
export { swaggerUi };
