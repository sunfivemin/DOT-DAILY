import { prisma } from '../prisma/client';

interface ITodo {
  userId: number;
  title: string;
  date: string;
  status: 'pending' | 'success' | 'retry' | 'archive';
  priority: 'must' | 'should' | 'remind';
}
// 투두 저장
export const createTodoService = async (input: ITodo) => {
  return await prisma.todos.create({
    data: {
      title: input.title,
      date: input.date,
      status: input.status ?? 'pending',
      priority: input.priority ?? 'must',
      userId: input.userId,
    },
  });
};

// 투두 전체 조회
export const getAllTodosService = async (userId: number) => {
  return await prisma.todos.findMany({
    where: { userId, status: { in: ['pending', 'retry', 'success'] } },
    orderBy: { date: 'asc' },
  });
};

//투두 특정 날짜 조회
export const getTodosByDateService = async (userId: number, date: string) => {
  return await prisma.todos.findMany({
    where: { userId, date, status: { in: ['pending', 'retry', 'success'] } },
    orderBy: { createdAt: 'asc' },
  });
};

//투두 업데이트
export const updateTodoService = async (
  todoId: number,
  userId: number,
  data: {
    title?: string;
    date?: string;
    status?: 'pending' | 'success' | 'retry' | 'archive';
    priority?: 'must' | 'should' | 'remind';
  }
) => {
  return await prisma.todos.updateMany({
    where: { id: todoId, userId },
    data: {
      ...data,
      date: data.date ? data.date : undefined,
    },
  });
};

// 투두 삭제
export const deleteTodoService = async (todoId: number, userId: number) => {
  return await prisma.todos.deleteMany({
    where: { id: todoId, userId },
  });
};
