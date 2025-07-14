import { prisma } from '../prisma/client';
import { addDays } from 'date-fns';

// ✅ KST 날짜 문자열 반환 함수 추가
function getKSTDateString(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  return kst.toISOString().split('T')[0];
}

// 만료된 투두를 retry로 변경하고 다음날로 이관
export const processExpiredTodos = async () => {
  const now = new Date();

  // ✅ 만료된 pending 투두 찾기 (KST 기준)
  const expiredTodos = await prisma.todos.findMany({
    where: {
      status: 'pending',
      date: { lt: getKSTDateString(now) }, // KST 기준으로 비교
    },
  });

  console.log(`[배치] 만료된 투두 ${expiredTodos.length}개 처리 중...`);

  // ✅ retry 상태로 변경 및 날짜 이관 (KST 기준)
  await Promise.all(
    expiredTodos.map(todo =>
      prisma.todos.update({
        where: { id: todo.id },
        data: {
          status: 'retry',
          retryCount: { increment: 1 },
          date: getKSTDateString(addDays(now, 1)), // KST 기준으로 다음날
        },
      })
    )
  );

  return { updatedCount: expiredTodos.length };
};
