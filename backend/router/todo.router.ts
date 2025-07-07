import express, { Request, Response } from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createTodoController,
  deleteTodoController,
  getAllTodosController,
  getTodosByDateController,
  upDateTodoController,
} from '../controller/todo.controller';

const router = express.Router();

// 투두 등록
router.post('/', authenticate, createTodoController);
// 투두 전체 조회
router.get('/', authenticate, getAllTodosController);
// 투두 날짜별 조회
router.get('/by-date', authenticate, getTodosByDateController);
// 투두 수정
router.put('/:id', authenticate, upDateTodoController);
// 투두 삭제
router.delete('/:id', authenticate, deleteTodoController);

export default router;
