import { Router } from 'express';
import {
  deleteArchivedTodoController,
  getArchivedTodosController,
  restoreArchivedTodoController,
  updateArchivedTodoController,
} from '../controller/archive.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = Router();

// 아카이브 목록 조회
router.get('/', authenticate, getArchivedTodosController);
// 아카이브 목록 수정
router.put('/:id', authenticate, updateArchivedTodoController);
// 아카이브 목록 삭제
router.delete('/:id', authenticate, deleteArchivedTodoController);
// 보관함 -> 오늘의 할일로 이동
router.put('/:id/restore', authenticate, restoreArchivedTodoController);

export default router;
