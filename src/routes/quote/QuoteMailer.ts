import { Router, Request, Response } from 'express';
import SendQuoteService from '../../services/SendQuoteService';

const quoteMailerRouter = Router();

quoteMailerRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, service, company, phone, cpfcnpj, product, date, deadline, cost, languageFrom, languageTo, attachments } = request.body;

  const sendMailService = new SendQuoteService;

  await sendMailService.execute({ name, email, service, company, phone, cpfcnpj, product, date, deadline, cost, languageFrom, languageTo, attachments });

  return response.json({ ok: true });
});

export default quoteMailerRouter;