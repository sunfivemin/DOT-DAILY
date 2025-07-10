import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { getUserStatsService } from '../service/userStats.service';

export const getUserStatsContoller = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const stats = await getUserStatsService(userId);

    res.status(StatusCodes.OK).json({
      message: '유저 통계 조회 성공',
      data: stats,
    });

    return;
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '통계 조회 중 오류가 발생 했습니다.',
    });
    return;
  }
};
