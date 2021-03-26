import * as aws from '@aws-sdk/client-ses';
import MailTemplateProvider from '../MailTemplateProvider/MailTemplateProvider';
import { IMailTemplateProvider } from '../MailTemplateProvider/IMailTemplateInterfaces';
import ISendMailDTO from './ISendMailDTO';
import IMailProvider from './IMailProvider';

class MailProvider implements IMailProvider {
  private client;
  private mailTemplateProvider: IMailTemplateProvider;

  constructor(
  ) {
    this.client = new aws.SES({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      },
      apiVersion: "2010-12-01",
      region: "sa-east-1"
    });
    this.mailTemplateProvider = new MailTemplateProvider;
  }

  public async sendEmail({ to, from, subject, templateData }: ISendMailDTO): Promise<void> {
    this.client.sendEmail({
      Destination: {
        BccAddresses: [],
        ToAddresses: [
          to.email,
        ]
      },
      Message: {
        Body: {
          Html: {
            Charset: "UTF-8",
            Data: await this.mailTemplateProvider.parse(templateData)
          }
        },
        Subject: {
          Charset: "UTF-8",
          Data: subject
        }
      },
      Source: "oi@konekto.me"
    },
      (err: any, info: any) => {
        console.log(err);
        console.log(info);
      }
    );
  }

}

export default MailProvider;
