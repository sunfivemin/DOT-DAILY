import express from 'express';
import { authenticate } from '../middlewares/authMiddleware';
import { getUserStatsContoller } from '../controller/userStats.controller';

const router = express.Router();

router.get('/stats', authenticate, getUserStatsContoller);

export default router;
