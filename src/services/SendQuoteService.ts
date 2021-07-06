import MailProvider from '../providers/MailProvider/MailProvider';
import path from 'path';

import IMailProvider from '../providers/MailProvider/IMailProvider';
import IQuoteRequest from '../routes/quote/IQuoteRequest';

export default class SendQuoteService {
  private mailProvider: IMailProvider;

  constructor() {
    this.mailProvider = new MailProvider();
  }

  public async execute({
    name,
    email,
    service,
    company,
    cpfcnpj,
    message,
    phone,
    deadline,
    cost,
    numberOfWords,
    languageFrom,
    languageTo,
    attachments
  }: IQuoteRequest): Promise<void> {
    const quoteTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'quote.hbs');
    const saleTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'sale.hbs');

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

    await this.mailProvider.sendEmail({
      to: {
        name: 'Vendas',
        email: process.env.DEFAULT_TO_EMAIL ||= 'renan@konekto.me',
      },
      subject: "Konekto | Pedido de Orçamento",
      templateData: {
        file: saleTemplate,
        variables: {
          name,
          email,
          company,
          cpfcnpj,
          phone,
          message,
          service,
          cost,
          numberOfWords,
          deadline,
          languageFrom,
          languageTo,
          attachments,
        }
      }
    });
  }
}