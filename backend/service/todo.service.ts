import { prisma } from '../prisma/client';

interface ITodo {
  userId: number;
  title: string;
  date: string;
  status: 'pending' | 'success' | 'retry' | 'archive';
  priority: 'must' | 'should' | 'remind';
}

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

export const updateTodoService = async (
  id: number,
  userId: number,
  update: Partial<Omit<ITodo, 'userId'>>
) => {
  return await prisma.todos.updateMany({
    where: { id, userId },
    data: {
      ...update,
      // date: update.date? new Date(update.date) : undefined,
      updatedAt: new Date(),
    },
  });
};

export const deleteTodoService = async (id: number, userId: number) => {
  return await prisma.todos.deleteMany({
    where: { id, userId },
  });
};
