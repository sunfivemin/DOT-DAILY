import express, { Request, Response } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { errorNotFoundHandler, errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './docs';
import swaggerUi from 'swagger-ui-express';
import routers from './router/index';

const app = express();
const port = 3000;

//기본 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 라우터
app.use('/api/v1', routers);

// swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// 404 핸들러
app.use(errorNotFoundHandler);
// 에러 핸들러
app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port} 번으로 실행중`);
});
