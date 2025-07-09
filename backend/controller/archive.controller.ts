import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import {
  deleteArchivedTodo,
  getArchivedTodos,
  restoreArchivedTodo,
  updateArchivedTodo,
} from '../service/archive.service';

// 보관함 목록 조회
export const getArchivedTodosController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const todos = await getArchivedTodos(userId);

    res.status(StatusCodes.OK).json({
      message: '보관함에 있는 투두 목록을 가져왔습니다.',
      data: todos,
    });
    return;
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '보관함 목록 조회 중 오류가 발생했습니다',
    });
    return;
  }
};

// 보관함 투두 수정
export const updateArchivedTodoController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const todoId = Number(req.params.id);
    const data = req.body;

    const updated = await updateArchivedTodo(todoId, userId, data);

    res.status(StatusCodes.OK).json({
      message: '보관함 투두가 수정되었습니다.',
      data: updated,
    });
    return;
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '보관함 투두 수정 중 오류가 발생했습니다.',
    });
    return;
  }
};

// 보관함 투두 삭제
export const deleteArchivedTodoController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const todoId = Number(req.params.id);

    const deleleted = await deleteArchivedTodo(todoId, userId);

    res.status(StatusCodes.OK).json({
      message: '보관함 투두가 삭제 되었습니다.',
      data: deleleted,
    });
    return;
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      message: '보관함 투두 삭제 중 오류가 발생헀습니다.',
    });
    return;
  }
};

// 보관함 -> 오늘의 할일로 이동
export const restoreArchivedTodoController = async (
  req: Request,
  res: Response
) => {
  try {
    const userId = req.user?.id;
    const todoId = Number(req.params.id);

    const restored = await restoreArchivedTodo(todoId, userId);

    res.status(StatusCodes.OK).json({
      message: '보관함에서 오늘의 할일로 복구했습니다.',
      data: restored,
    });
    return;
  } catch (err: any) {
    res.status(StatusCodes.BAD_REQUEST).json({
      message: err.message || '복구 중 오류가 발생했습니다.',
    });
  }
};
