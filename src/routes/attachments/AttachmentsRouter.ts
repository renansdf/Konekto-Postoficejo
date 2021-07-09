import { Router, Request, Response } from 'express';
import multer from 'multer';

import AppError from '../../shared/AppError';
import configs from '../../configs/storage';
import S3StorageProvider from '../../providers/StorageProvider/S3StorageProvider';

const attachmentsRouter = Router();
const upload = multer({ storage: configs.storage });

attachmentsRouter.post('/', upload.single('attachment'), async (request: Request, response: Response) => {
  const attachmentFile = request.file;

  if (!attachmentFile) {
    throw new AppError('file not found', 404);
  }

  const storageProvider = new S3StorageProvider();
  const fileURL = await storageProvider.saveFile(attachmentFile.filename);

  return response.json({ fileURL });
});

export default attachmentsRouter;
