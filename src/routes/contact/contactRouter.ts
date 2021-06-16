import { Router, Request, Response } from 'express';
import SendContactEmailService from '../../services/SendContactEmailService';

const contactRounter = Router();

contactRounter.post('/', async (request: Request, response: Response) => {
  const {name, company, email, phone, attachments, message, formName} = request.body;

  const emailService = new SendContactEmailService;
  await emailService.execute({name, company, email, phone, attachments, message, formName});

  return response.status(200).json({ status: 'success' });
});

export default contactRounter;