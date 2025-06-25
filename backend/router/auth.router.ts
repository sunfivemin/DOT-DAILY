// routes/auth.route.ts
import express, { Request, Response } from 'express';
import { registerController } from '../controller/register.controller';
import { loginController } from '../controller/auth.controller';

const router = express.Router();

// 회원가입
router.post('/signup', registerController);

// 로그인
router.post('/login', loginController);

export default router;
