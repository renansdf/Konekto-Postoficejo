import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const filesPath = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: filesPath,
  uploadsFolder: path.resolve(filesPath, 'uploads'),
  aws: {
    bucket: 'postoficejo-quotes'
  },

  storage: multer.diskStorage({
    destination: filesPath,
    filename(request, file, callback) {
      const filehash = crypto.randomBytes(10).toString('hex');
      const parsedName = file.originalname.replace(/[^a-zA-Z.]/g, '');
      const filename = `${filehash}-${parsedName}`;

      return callback(null, filename);
    },
  }),
}
