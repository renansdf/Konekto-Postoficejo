export default interface IQuoteRequest {
  name: string;
  email: string;
  service: string;
  company: string;
  cpfcnpj: string;
  cep: string;
  phone: number;
  message: string;
  date: string;
  deadline: string;
  cost: string;
  numberOfWords: number;
  totalMinutes: number;
  languageFrom: string;
  languageTo: string;
  attachments: {
    filename: string;
    content: string;
  }[];
}