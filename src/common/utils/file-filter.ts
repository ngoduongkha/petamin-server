import { BadRequestException } from '@nestjs/common';
import { FileSupported } from '../constants';

export const imageFileFilter = (
  _: any,
  file: Express.Multer.File,
  callback: (error: Error | null, acceptFile: boolean) => void,
): void => {
  if (!FileSupported.includes(file.mimetype)) {
    return callback(new BadRequestException('Only image files are allowed!'), false);
  }

  return callback(null, true);
};
