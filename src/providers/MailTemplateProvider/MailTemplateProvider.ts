import handlebars from 'handlebars';
import { IMailTemplateProvider, IParseMailTemplateDTO } from './IMailTemplateInterfaces';
import fs from 'fs';

class MailTemplateProvider implements IMailTemplateProvider {
  public async parse({ file, variables }: IParseMailTemplateDTO): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parsedTemplate = handlebars.compile(templateFileContent);

    return parsedTemplate(variables);
  }
}

export default MailTemplateProvider;
