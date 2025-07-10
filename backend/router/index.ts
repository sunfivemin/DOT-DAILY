import express from 'express';
import authRouter from './auth.router';
import todoRouter from './todo.router';
import archiveRouter from './archive.router';
import dailyReviews from './dailyReview.router';
import userStats from './userStats.router';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/todos', todoRouter);
routers.use('/archive', archiveRouter);
routers.use('/daily-reviews', dailyReviews);
routers.use('/user', userStats);

export default routers;
