import { z } from 'zod';

export const registerSchema = z
  .object({
    username: z
      .string()
      .min(1, { message: '이름을 입력해야 합니다.' })
      .min(2, { message: '이름은 2자 이상이어야 합니다.' }),
    email: z
      .string()
      .min(1, { message: '이메일을 입력해야 합니다.' })
      .email({ message: '올바른 이메일 형식이어야 합니다.' }),
    password: z
      .string()
      .min(6, { message: '비밀번호는 6자 이상이어야 합니다.' }),
    confirm_password: z
      .string()
      .min(1, { message: '비밀번호 확인을 입력해야 합니다.' }),
  })
  .refine(data => data.password === data.confirm_password, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirm_password'],
  });

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '이메일을 입력해야 합니다.' })
    .email({ message: '올바른 이메일 형식이어야 합니다.' }),

  password: z.string().min(1, { message: '비밀번호를 입력해야 합니다.' }),
});
