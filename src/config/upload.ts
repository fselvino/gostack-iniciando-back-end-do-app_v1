import { request } from 'express';
import multer from 'multer';
import cryto from 'crypto';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  directory: tmpFolder,

  storage: multer.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = cryto.randomBytes(10).toString('hex');
      const fileName = `${fileHash}-${file.originalname}`;

      return callback(null, fileName);
    },
  }),
};
