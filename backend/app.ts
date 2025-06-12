import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();
const port = 3000;

//기본 미들웨어
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.listen(port, () => {
    console.log(`${port} 번으로 실행중`);
});