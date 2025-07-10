import { email } from 'zod/v4';
import { prisma } from '../prisma/client';

export const getUserStatsService = async (userId: number) => {
  // user 정보 가져오기
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      username: true,
      email: true,
    },
  });

  //상태별 투두 갯수
  const todoCounts = await prisma.todos.groupBy({
    by: ['status'],
    where: { userId },
    _count: true,
  });

  // 감정 스티커 개수
  const stickerCounts = await prisma.dailyReviews.groupBy({
    by: ['stickerId'],
    where: { userId },
    _count: true,
  });

  const stickers = await prisma.stickers.findMany();

  const stickerStats = stickerCounts.map(sticker => {
    const info = stickers.find(s => s.id === sticker.stickerId);
    return {
      stickerId: sticker.stickerId,
      label: info?.label,
      emoji: info?.emoji,
      count: sticker._count,
    };
  });

  return {
    user: {
      username: user?.username,
      email: user?.email,
    },
    todos: todoCounts.reduce(
      (acc, item) => ({
        ...acc,
        [item.status]: item._count,
      }),
      {}
    ),
    stickers: stickerStats,
  };
};
