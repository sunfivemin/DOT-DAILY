import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  createTodoService,
  //   updateTodoService,
  //   deleteTodoService,
} from '../service/todo.service';
import { insertTodoSchema } from '../validations/todoValidation';
import { ZodError } from 'zod';

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
