import { Router, Request, Response } from 'express';
import SendMailService from '../../services/SendMailService';

const quoteMailerRouter = Router();

quoteMailerRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, service, company, date, deadline, cost, languageFrom, languageTo, quoteUrl, attachments } = request.body;

  const sendMailService = new SendMailService;
  await sendMailService.execute({ name, email, service, company, date, deadline, cost, languageFrom, languageTo, quoteUrl, attachments });
  // console.log({ name, email, service, company, date, deadline, cost, languageFrom, languageTo, quoteUrl, attachments });
  return response.json({ ok: true });
});

export default quoteMailerRouter;