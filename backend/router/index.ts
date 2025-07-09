import express from 'express';
import authRouter from './auth.router';
import todoRouter from './todo.router';
import archiveRouter from './archive.router';

const routers = express.Router();

routers.use('/auth', authRouter);
routers.use('/todos', todoRouter);
routers.use('/archive', archiveRouter);

export default routers;
