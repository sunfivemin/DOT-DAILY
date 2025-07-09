import { tr } from 'date-fns/locale';
import { prisma } from '../prisma/client';

interface IReview {
  userId: number;
  date: Date;
  stickerId: number;
  memo: string;
  compareNote?: string;
}

// 저장
export const createDailyReviewService = async (input: IReview) => {
  return await prisma.dailyReviews.create({
    data: {
      userId: input.userId,
      date: input.date,
      stickerId: input.stickerId,
      memo: input.memo,
      compareNote: input.compareNote,
    },
    include: {
      sticker: true,
    },
  });
};

// 전체 조회
export const getDailyReviewByDateService = async (
  userId: number,
  date: Date
) => {
  return await prisma.dailyReviews.findUnique({
    where: {
      userId_date: { userId, date },
    },
    include: {
      sticker: true,
    },
  });
};

// 월별 조회
export const getMonthlyReviewsService = async (
  userId: number,
  year: number,
  month: number
) => {
  const startDate = new Date(year, month - 1, 1); // YYYY-MM-01
  const endDate = new Date(year, month, 0, 23, 59, 59, 999); // 해당 월 마지막날

  return await prisma.dailyReviews.findMany({
    where: {
      userId,
      date: {
        gte: startDate,
        lte: endDate,
      },
    },
    include: {
      sticker: true,
    },
    orderBy: {
      date: 'asc',
    },
  });
};

// 수정
export const updateDailyReviewService = async (
  userId: number,
  date: Date,
  data: {
    stickerId?: number;
    memo?: string;
    compareNote?: string;
  }
) => {
  return await prisma.dailyReviews.update({
    where: {
      userId_date: { userId, date },
    },
    data,
    include: {
      sticker: true,
    },
  });
};

// 삭제
export const deleteDailyReviewService = async (userId: number, date: Date) => {
  return await prisma.dailyReviews.delete({
    where: {
      userId_date: { userId, date },
    },
  });
};
