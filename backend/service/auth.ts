import { prisma } from '../prisma/client';
import bcrypt from 'bcrypt';

export const signin = async (body: any) => {
  const user = await prisma.user.findUnique({
    where: {
      username: body.username,
    },
  });

  if (!user) {
    throw new Error('존재하지 않는 아이디입니다.');
  }

  if (user.password_hash) {
    const check = await bcrypt.compare(body.password, user.password_hash);
    if (!check) {
      throw new Error('비밀번호가 일치하지 않습니다.');
    }
    return user;
  }

  return null;
};
