import { Router, Request, Response } from 'express';
import multer from "multer";

import S3StorageProvider from '../../providers/StorageProvider/S3StorageProvider';
import configs from '../../configs/storage';

const attachmentsRouter = Router();
const upload = multer({ storage: configs.storage });

attachmentsRouter.post('/', upload.single('attachment'), async (request: Request, response: Response) => {
  const attachmentFile = request.file;

  const storageProvider = new S3StorageProvider;
  const fileURL = await storageProvider.saveFile(attachmentFile.filename);

  return response.json({ fileURL });
});

export default attachmentsRouter;