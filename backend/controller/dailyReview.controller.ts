import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createDailyReviewService,
  getDailyReviewByDateService,
  getMonthlyReviewsService,
  updateDailyReviewService,
  deleteDailyReviewService,
} from '../service/dailyReview.service';

// 등록
export const createDailyReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { date, stickerId, memo, compareNote } = req.body;

    const review = await createDailyReviewService({
      userId,
      date: new Date(date),
      stickerId,
      memo,
      compareNote,
    });
    res.status(StatusCodes.CREATED).json({
      message: '하루 회고가 등록되었습니다.',
      data: review,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '하루 회고 등록 중 오류가 발생했습니다.',
    });
    return;
  }
};

// 조회
export const getDailyReviewController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const date = req.params.date;

    const review = await getDailyReviewByDateService(userId, new Date(date));

    if (!review) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: '회고가 존재하지 않습니다.',
      });
      return;
    }

    res.status(StatusCodes.OK).json(review);
    return;
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '회고 조회 중 오류가 발생했습니다.',
    });
  }
};

//월별조회
export const getMonthlyReviewsController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const { year, month } = req.query;

    if (!year || !month) {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: 'year와 month를 쿼리 파라미터로 전달해야 합니다.',
      });
      return;
    }

    const reviews = await getMonthlyReviewsService(
      userId,
      Number(year),
      Number(month)
    );

    res.status(StatusCodes.OK).json({
      message: `${year}년 ${month}월 회고 목록입니다.`,
      data: reviews,
    });
    return;
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '한달치 회고 조회 중 오류가 발생했습니다.',
    });
    return;
  }
};

// 수정
export const updateDailyReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const date = req.params.date;
    const { stickerId, memo, compareNote } = req.body;

    const review = await updateDailyReviewService(userId, new Date(date), {
      stickerId,
      memo,
      compareNote,
    });

    res.status(StatusCodes.OK).json({
      message: '하루 회고가 수정되었습니다.',
      data: review,
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '회고 수정 중 오류가 발생했습니다.',
    });
  }
};

// 삭제
export const deleteDailyReviewController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const date = req.params.date;

    await deleteDailyReviewService(userId, new Date(date));

    res.status(StatusCodes.OK).json({
      message: '하루 회고가 삭제되었습니다.',
    });
  } catch (err) {
    console.error(err);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '회고 삭제 중 오류가 발생했습니다.',
    });
  }
};
