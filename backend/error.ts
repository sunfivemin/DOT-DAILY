import { StatusCodes } from 'http-status-codes';

export class HttpError extends Error {
  status: number;
  name: string;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends HttpError {
  constructor(message: string, status = StatusCodes.NOT_FOUND) {
    super(status, message);
    this.name = 'NotFoundError';
  }
}
