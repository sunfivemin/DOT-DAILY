import { z } from 'zod';

export const insertTodoSchema = z.object({
  title: z.string().min(1, { message: '오늘 할 일을 적어주세요' }),
  date: z.string().min(1, { message: '날자를 입력 해주세요' }),
});
