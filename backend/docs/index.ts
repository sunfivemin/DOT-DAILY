import swaggerJSDoc from 'swagger-jsdoc';
import { authSwagger } from './auth.swagger';
import { todoSwagger } from './todo.swagger';
import { archiveSwagger } from './archive.swagger';
import { dailyReviewSwagger } from './dailyReview.swagger';
import { userStatsSwagger } from './userStats.swagger';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Dot-Daily',
    version: '1.0.0',
    description: 'API 명세서',
  },
  servers: [
    {
      url: 'https://dot-daily.onrender.com/',
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
  paths: {
    ...authSwagger,
    ...todoSwagger,
    ...archiveSwagger,
    ...dailyReviewSwagger,
    ...userStatsSwagger,
  },
};

export const swaggerSpec = swaggerJSDoc({
  swaggerDefinition,
  apis: [], // 주석 방식 안 쓰면 비워도 됨
});
