// routes/auth.route.ts
import express, { Request, Response } from 'express';
import { registerController } from '../controller/register.controller';
import {
  loginController,
  logoutController,
} from '../controller/auth.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// 회원가입
router.post('/signup', registerController);

// 로그인
router.post('/login', loginController);

// 로그아웃
router.post('/logout', authenticate, logoutController);

export default router;
