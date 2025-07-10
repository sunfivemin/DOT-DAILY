import express from 'express';
import {
  createDailyReviewController,
  getDailyReviewController,
  updateDailyReviewController,
  deleteDailyReviewController,
  getMonthlyReviewsController,
} from '../controller/dailyReview.controller';

import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// 회고 저장
router.post('/', authenticate, createDailyReviewController);

// 회고 월별 조회
router.get('/month', authenticate, getMonthlyReviewsController);

// 회고 전체 조회
router.get('/:date', authenticate, getDailyReviewController);

// 회고 수정
router.put('/:date', authenticate, updateDailyReviewController);

//회고 삭제
router.delete('/:date', authenticate, deleteDailyReviewController);

export default router;
