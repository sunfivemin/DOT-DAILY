import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { NotFoundError, HttpError } from '../error';
export const errorHandler = (
  err: HttpError | NotFoundError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  console.error('에러 발생', err.stack || err.message);
  console.error(err);
  const status =
    err instanceof HttpError ? err.status : StatusCodes.INTERNAL_SERVER_ERROR;

  res.status(status).json({
    error: {
      name: err.name || 'UnknownError',
      message: err.message || '예상치 못한 오류가 발생했습니다',
      status,
    },
  });
};

export const errorNotFoundHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction
): void => {
  next(new NotFoundError('요청하신 페이지를 찾을 수 없습니다.'));
};
