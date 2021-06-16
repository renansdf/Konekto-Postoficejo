export default interface IContactRequest {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  formName: string;
  attachments: {
    filename: string;
    content: string;
  }[];
}