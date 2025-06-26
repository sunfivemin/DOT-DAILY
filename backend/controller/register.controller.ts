import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { ZodError } from 'zod';
import { registerSchema } from '../validations/authValidation';
import { registerService } from '../service/register.service';

export const registerController = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const parsed = registerSchema.parse(req.body);

    const { username, email, password } = parsed;

    const result = await registerService({ username, email, password });
    res.status(StatusCodes.CREATED).json(result);

    return res.redirect('/');
  } catch (err) {
    if (err instanceof ZodError) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ errors: err.flatten().fieldErrors });
      return;
    }
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: '서버 오류가 발생했습니다.' });
    return;
  }
};
