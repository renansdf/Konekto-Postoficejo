interface IMailVariables {
  [key: string]: string | number;
}

export interface IParseMailTemplateDTO {
  file: string;
  variables: IMailVariables;
}

export interface IMailTemplateProvider {
  parse({ file, variables }: IParseMailTemplateDTO): Promise<string>;
}
