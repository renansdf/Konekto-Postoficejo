import MailProvider from '../providers/MailProvider/MailProvider';
import path from 'path';

import IMailProvider from '../providers/MailProvider/IMailProvider';
import IQuoteRequest from '../routes/quote/IQuoteRequest';

export default class SendMailService {
  private mailProvider: IMailProvider;

  constructor() {
    this.mailProvider = new MailProvider();
  }

  public async execute({
    name,
    email,
    service,
    company,
    deadline,
    cost,
    languageFrom,
    languageTo,
    attachments
  }: IQuoteRequest): Promise<void> {
    const quoteTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'quote.hbs');

    await this.mailProvider.sendEmail({
      to: {
        name: name,
        email: email
      },
      subject: "Konekto | Orçamento Instantâneo",
      templateData: {
        file: quoteTemplate,
        variables: {
          name,
          company,
          service,
          cost,
          deadline,
          languageFrom,
          languageTo,
          attachments,
        }
      }
    });
  }
}