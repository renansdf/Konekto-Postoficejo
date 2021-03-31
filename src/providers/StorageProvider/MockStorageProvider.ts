import path from 'path';
import fs from 'fs';

import configs from '../../configs/storage';
import IStorageProvider from './IStorageProvider';

class MockStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    const filePath = path.resolve(configs.tmpFolder, file);

    await fs.promises.unlink(filePath);

    return `mock.url/${file}`;
  }
}

export default MockStorageProvider;