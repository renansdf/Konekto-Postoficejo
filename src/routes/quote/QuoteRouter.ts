import { Router, Request, Response } from 'express';
import SendQuoteService from '../../services/SendQuoteService';

const quoteRouter = Router();

quoteRouter.post('/', async (request: Request, response: Response) => {
  const { name, email, service, company, phone, cpfcnpj, message, date, deadline, cost, numberOfWords, totalMinutes, languageFrom, languageTo, attachments } = request.body;

  const sendQuoteService = new SendQuoteService;

  await sendQuoteService.execute({ name, email, service, company, phone, cpfcnpj, message, date, deadline, cost, numberOfWords, totalMinutes, languageFrom, languageTo, attachments });

  return response.json({ ok: true });
});

export default quoteRouter;