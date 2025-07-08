import { prisma } from '../prisma/client';
import { addDays } from 'date-fns';

/**
 *  만료된 투두를 retry로 변경하고 다음날로 이관
 */
export const processExpiredTodos = async () => {
  const now = new Date();

  // ✅ 만료된 pending 투두 찾기
  const expiredTodos = await prisma.todos.findMany({
    where: {
      status: 'pending',
      date: { lt: now.toISOString().split('T')[0] }, // yyyy-MM-dd 비교
    },
  });

  console.log(`[배치] 만료된 투두 ${expiredTodos.length}개 처리 중...`);

  //  retry 상태로 변경 및 날짜 이관
  await Promise.all(
    expiredTodos.map(todo =>
      prisma.todos.update({
        where: { id: todo.id },
        data: {
          status: 'retry',
          retryCount: { increment: 1 },
          date: addDays(now, 1).toISOString().split('T')[0], // yyyy-MM-dd로
        },
      })
    )
  );

  return { updatedCount: expiredTodos.length };
};
