import { ZodError } from 'zod';

export const formatError = (error: ZodError) => {
  const formatted: Record<string, string> = {};

  for (const [key, value] of Object.entries(error.flatten().fieldErrors)) {
    if (value && value.length > 0) {
      formatted[key] = value[0]; // 첫 번째 에러 메시지만 사용
    }
  }

  return formatted;
};
