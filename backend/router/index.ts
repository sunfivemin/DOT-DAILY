import express from 'express';
import authRouter from './auth.router';
import todoRouter from './todo.router';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/todos', todoRouter);

export default routers;
