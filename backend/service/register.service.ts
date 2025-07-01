import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

export const registerService = async (payload: RegisterPayload) => {
  const existingUser = await prisma.user.findUnique({
    where: { email: payload.email },
  });

  if (existingUser) {
    return {
      errors: {
        email: '이미 사용 중인 이메일입니다.',
      },
    };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(payload.password, salt);

  await prisma.user.create({
    data: {
      username: payload.username,
      email: payload.email,
      password_hash: hashedPassword,
    },
  });

  return { message: '회원가입이 완료되었습니다.' };
};
