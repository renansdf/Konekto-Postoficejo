import { S3Client, AbortMultipartUploadCommand, AbortMultipartUploadCommandOutput } from '@aws-sdk/client-s3';
import path from 'path';
import fs from 'fs';
import configs from '../../configs/storage';

import IStorageProvider from './IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private client: S3Client;

  constructor() {
    this.client = new S3Client({
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
      },
      region: "sa-east-1"
    });
  }

  public async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(configs.tmpFolder, file);

    const fileContent = await fs.promises.readFile(filePath, {
      encoding: 'utf-8'
    })

    const params = {
      Bucket: 'postoficejo-quotes',
      Key: file,
      body: fileContent,
      ACL: 'public-read',
      UploadId: file
    }

    const command = new AbortMultipartUploadCommand(params);

    this.client.send(command,
      (err: any, info: any) => {
        console.log(err);
        console.log(info);
      });

    return file;
  }
}

export default S3StorageProvider;