import { Request, Response } from 'express';

class AppError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = Error.name;
    this.statusCode = statusCode;
    Error.captureStackTrace(this);
  }
}

const errorHandler = (error: AppError, req: Request, res: Response) => {
  console.log(`error ${error.message}`);
  const status = error.statusCode || 500;
  res.status(status).send(error.message);
};

export default errorHandler;
