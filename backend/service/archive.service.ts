import { prisma } from '../prisma/client';

// 보관함 투두 목록 조회
export const getArchivedTodos = async (userId: number) => {
  return await prisma.todos.findMany({
    where: { userId, status: 'archive' },
    orderBy: { createdAt: 'desc' },
  });
};

// 보관함 투두 수정
export const updateArchivedTodo = async (
  todoId: number,
  userId: number,
  data: {
    title?: string;
    date?: string;
    priority?: 'must' | 'should' | 'remind';
  }
) => {
  return await prisma.todos.updateMany({
    where: { id: todoId, userId, status: 'archive' },
    data,
  });
};

// 보관함 투두 삭제
export const deleteArchivedTodo = async (todoId: number, userId: number) => {
  return await prisma.todos.deleteMany({
    where: { id: todoId, userId, status: 'archive' },
  });
};

// 복구: 보관함 → 오늘의 할일
export const restoreArchivedTodo = async (todoId: number, userId: number) => {
  const updated = await prisma.todos.updateMany({
    where: { id: todoId, userId, status: 'archive' },
    data: {
      status: 'pending', // ✅ 오늘의 할일 상태로 변경
      date: new Date().toISOString().split('T')[0], // ✅ 오늘 날짜로 이관
    },
  });

  if (updated.count === 0) {
    throw new Error('보관함에 있는 투두만 복구할 수 있습니다.');
  }

  return updated;
};
