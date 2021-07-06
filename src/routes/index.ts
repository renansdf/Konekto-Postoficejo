import {Router, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import AppError from '../shared/AppError';

import quoteMailerRouter from './quote/QuoteMailer';
import attachmentsRouter from './attachments/AttachmentsRouter';
import contactRouter from './contact/contactRouter';

const routes = Router();
routes.use(cors());

routes.use('/quote', quoteMailerRouter);
routes.use('/attachments', attachmentsRouter);
routes.use('/contact', contactRouter);

routes.use((err: Error, request: Request, response: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

export default routes;