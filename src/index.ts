import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';

import quoteMailerRouter from './routes/quote/QuoteMailer';
import attachmentsRouter from './routes/attachments/AttachmentsRouter';
import contactRouter from './routes/contact/contactRouter';
import AppError from './shared/AppError';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/quote', quoteMailerRouter);
app.use('/attachments', attachmentsRouter);
app.use('/contact', contactRouter);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
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

app.listen(process.env.PORT || 3333, () => {
  console.log('server started @ 3333');
});
