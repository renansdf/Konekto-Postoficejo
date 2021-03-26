interface IMailVariables {
  [key: string]: string | number | { filename: string; content: string; }[];
}

export interface IParseMailTemplateDTO {
  file: string;
  variables: IMailVariables;
}

export interface IMailTemplateProvider {
  parse({ file, variables }: IParseMailTemplateDTO): Promise<string>;
}
