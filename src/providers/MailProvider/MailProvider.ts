import nodemailer, { Transporter } from 'nodemailer';
import * as aws from '@aws-sdk/client-ses';
import MailTemplateProvider from '../MailTemplateProvider/MailTemplateProvider';
import { IMailTemplateProvider } from '../MailTemplateProvider/IMailTemplateInterfaces';
import ISendMailDTO from './ISendMailDTO';
import IMailProvider from './IMailProvider';

class MailProvider implements IMailProvider {
  private client: Transporter;
  private mailTemplateProvider: IMailTemplateProvider;

  constructor(
  ) {
    const ses = new aws.SES({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
      apiVersion: "2010-12-01",
      region: "sa-east-1"
    });

    this.client = nodemailer.createTransport({
      SES: { ses, aws }
    });

    this.mailTemplateProvider = new MailTemplateProvider;
  }

  public async sendEmail({ to, from, subject, templateData, attachments }: ISendMailDTO): Promise<void> {
    this.client.sendMail({
      from: {
        name: from?.name || 'Konekto',
        address: from?.email || 'oi@konekto.me'
      },
      to: {
        name: to.name,
        address: 'renan@konekto.me'
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData),
      attachments: attachments,
    },
      (err: any, info: any) => {
        console.log(err);
        console.log(info);
      }
    );
  }

}

export default MailProvider;
