import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createTodoService,
  deleteTodoService,
  getAllTodosService,
  getTodosByDateService,
  updateTodoService,
} from '../service/todo.service';
import { insertTodoSchema } from '../validations/todoValidation';
import { ZodError } from 'zod';

//투두 등록
export const createTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const parsed = insertTodoSchema.parse(req.body);

    const { title, date } = parsed;
    const { status, priority } = req.body;

    const todo = await createTodoService({
      userId,
      title,
      date,
      status,
      priority,
    });

    res.status(StatusCodes.CREATED).json({
      message: '투두가 생성 되었습니다.',
      data: todo,
    });
    return res.redirect('/');
  } catch (err) {
    if (err instanceof ZodError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: err.flatten().fieldErrors });
      return;
    }
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '투두 생성 중 오류가 발생했습니다',
    });
    return;
  }
};

// 투두 전체 조회
export const getAllTodosController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const todos = await getAllTodosService(userId);

    res.status(StatusCodes.OK).json({
      message: '전체 투두 목록 조회 성공',
      data: todos,
    });
    return;
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: '전체 투두 목록 조회 중 오류 발생' });
    return;
  }
};

//투두 날짜별 조회
export const getTodosByDateController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const { date } = req.query as { date: string };
    if (!date) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({
          message: '날짜(date)를 query로 전달해주세요 (예: ?date=2025-07-04)',
        });
      return;
    }
    const todos = await getTodosByDateService(userId, date);
    res.status(StatusCodes.OK).json({
      message: `${date}의 투두 목록 조회 성공`,
      data: todos,
    });
    return;
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: '날짜별 투두 목록 조회 중 오류 발생' });
    return;
  }
};

//투두 수정
export const upDateTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const todoId = Number(req.params.id);
    const data = req.body;

    const updated = await updateTodoService(todoId, userId, data);

    if (updated.count === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: '수정할 투두가 존재 하지 않습니다.',
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: '투두가 수정되었습니다.',
    });
    return;
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: '투두 수정 중 오류 발생' });
    return;
  }
};

//투두 삭제
export const deleteTodoController = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    const todoId = Number(req.params.id);

    const deleted = await deleteTodoService(todoId, userId);

    if (deleted.count === 0) {
      res.status(StatusCodes.NOT_FOUND).json({
        message: '삭제할 투두가 존재하지 않습니다.',
      });
      return;
    }
    res.status(StatusCodes.OK).json({
      message: '투두가 삭제되었습니다.',
    });
  } catch (err) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: '투두 삭제 중 오류 발생' });
    return;
  }
};
