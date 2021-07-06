import {Router, NextFunction, Request, Response } from 'express';
import cors from 'cors';

import AppError from '../shared/AppError';
import corsConfig from '../configs/cors';

import quoteMailerRouter from './quote/QuoteMailer';
import attachmentsRouter from './attachments/AttachmentsRouter';
import contactRouter from './contact/contactRouter';

const routes = Router();
const environment = process.env.CURRENT_ENVIRONMENT ||= 'development';

routes.use('/quote', cors({origin: corsConfig[environment].quote}), quoteMailerRouter);
routes.use('/attachments', cors({origin: corsConfig[environment].attachments}), attachmentsRouter);
routes.use('/contact', cors({origin: corsConfig[environment].contact}), contactRouter);

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