import { prisma } from '../prisma/client';

interface IReview {
  userId: number;
  date: Date;
  stickerId: number;
  memo: string;
  comareNote?: string;
}

export const createDailyReviewService = async (input: IReview) => {
  return await prisma.dailyReviews.create({
    data: {
      userId: input.userId,
      date: input.date,
      stickerId: input.stickerId,
      memo: input.memo,
      compareNote: input.comareNote,
    },
    include: {
      sticker: true,
    },
  });
};
