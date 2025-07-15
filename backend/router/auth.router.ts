// routes/auth.route.ts
import express, { Request, Response } from 'express';
import { registerController } from '../controller/register.controller';
import {
  loginController,
  logoutController,
  googleLoginController,
  googleCallbackController,
} from '../controller/auth.controller';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

// 회원가입
router.post('/signup', registerController);

// 로그인
router.post('/login', loginController);

// 로그아웃
router.post('/logout', authenticate, logoutController);

// Google 로그인
router.post('/google/login', googleLoginController);

// Google 로그인 콜백 엔드포인트
router.post('/google/callback', googleCallbackController);

export default router;
