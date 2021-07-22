import path from 'path';
import MailProvider from '../providers/MailProvider/MailProvider';

import IMailProvider from '../providers/MailProvider/IMailProvider';

export default class SendTestEmailService {
  private mailProvider: IMailProvider;

  constructor() {
    this.mailProvider = new MailProvider();
  }

  public async execute(): Promise<void> {
    const testTemplate = path.resolve(__dirname, '..', 'providers', 'MailTemplateProvider', 'views', 'test.hbs');

    await this.mailProvider.sendEmail({
      to: {
        name: 'test',
        email: process.env.DEFAULT_TO_EMAIL || '',
      },
      subject: 'test email',
      templateData: {
        file: testTemplate,
        variables: {
          true: 'true'
        }
      }
    });

  }
}