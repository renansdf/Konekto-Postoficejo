import { IParseMailTemplateDTO } from '../MailTemplateProvider/IMailTemplateInterfaces'

interface IMailData {
  name: string;
  email: string;
}

export default interface ISendMailDTO {
  to: IMailData;
  from?: IMailData;
  subject: string;
  templateData: IParseMailTemplateDTO;
  attachments?: {
    filename: string;
    content: string | Buffer;
  }[];
}
