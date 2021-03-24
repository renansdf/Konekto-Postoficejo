import express from 'express';
import cors from 'cors';

import quoteMailerRouter from './routes/quote/QuoteMailer';
import attachmentsRouter from './routes/attachments/AttachmentsRouter';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/quote', quoteMailerRouter);
app.use('/attachments', attachmentsRouter);

app.listen(process.env.PORT || 3333, () => {
  console.log('Servidor iniciado na porta 3333 🚀');
});
