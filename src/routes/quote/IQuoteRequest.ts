export default interface IQuoteRequest {
  name: string;
  email: string;
  service: string;
  company: string;
  cpfcnpj: string;
  product: string;
  phone: number;
  date: string;
  deadline: string;
  cost: string;
  languageFrom: string;
  languageTo: string;
  attachments: {
    filename: string;
    content: string;
  }[];
}