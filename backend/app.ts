import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { notFound } from './middlewares/notFound';
import { errorHandler } from 'middlewares/errorHandler';
import { ExpressAuth } from '@auth/express';
import Credentials from '@auth/express/providers/credentials';
import { signin } from 'service/auth';

const app = express();
const port = 3000;

//기본 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// 라우터
// 로그인 로직
app.use(
  '/api/v1/auth/*',
  ExpressAuth({
    trustHost: true,
    providers: [
      Credentials({
        credentials: {
          username: { label: 'Username' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(body: any) {
          return signin(body);
        },
      }),
    ],
  })
);

// 404 핸들러
app.use(notFound);

// 에러 핸들러
app.use(errorHandler);

app.listen(port, () => {
  console.log(`${port} 번으로 실행중`);
});
