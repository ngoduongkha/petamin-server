import { BadRequestException } from '@nestjs/common';
import { FileSupported } from '../constants';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: any,
) => {
  if (!FileSupported.includes(file.mimetype)) {
    return callback(
      new BadRequestException('Only image files are allowed!'),
      false,
    );
  }
  callback(null, true);
};
