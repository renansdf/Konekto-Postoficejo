import ISendMailDTO from "./ISendMailDTO";

export default interface IMailProvider {
  sendEmail(data: ISendMailDTO): Promise<void>
}
