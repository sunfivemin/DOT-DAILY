import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('에러 발생', err.stack || err.message);
  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    message: err.message || '서버 에러가 발생 했습니다.',
  });
};
