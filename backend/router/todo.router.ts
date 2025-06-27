import express, { Request, Response } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { createTodoController } from '../controller/todo.controller';

const router = express.Router();

// todo 등록
router.post('/', authenticate, createTodoController);

export default router;
