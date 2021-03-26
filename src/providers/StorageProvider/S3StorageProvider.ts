import { S3 } from '@aws-sdk/client-s3';
import path from 'path';
import mime from 'mime';
import fs from 'fs';

import configs from '../../configs/storage';
import IStorageProvider from './IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new S3({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || ''
      },
      region: "sa-east-1"
    });
  }

  public async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(configs.tmpFolder, file);

    const ContentType = mime.getType(filePath);

    if (!ContentType) {
      throw new Error('file not found');
    }

    const fileContent = await fs.promises.readFile(filePath);

    await this.client.putObject({
      Bucket: configs.aws.bucket,
      Key: file,
      ACL: 'public-read',
      Body: fileContent,
      ContentType,
    });

    await fs.promises.unlink(filePath);

    return `https://${configs.aws.bucket}.s3-sa-east-1.amazonaws.com/${file}`;
  }
}

export default S3StorageProvider;