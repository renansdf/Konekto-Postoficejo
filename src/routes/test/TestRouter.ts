import { Router, Request, Response } from 'express';
import SendTestEmailService from '../../services/TestService';

const testRouter = Router();

testRouter.post('/', async (request: Request, response: Response) => {

  const mailer = new SendTestEmailService;

  await mailer.execute();

  return response.json({ success: 'check logs' });
});

export default testRouter;