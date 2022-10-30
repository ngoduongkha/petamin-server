import { Injectable, HttpException, BadRequestException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';

@Injectable()
export class FileService {
  constructor(private s3Service: S3Service) {}

  async uploadFile(file: Express.Multer.File) {
    if (!file) throw new BadRequestException();

    return await this.s3Service.uploadPublicFile(file);
  }

  async uploadFiles(files: Express.Multer.File[]) {
    if (files.length < 1) throw new BadRequestException();

    const promiseUpload = files.map(async (file) => {
      return await this.s3Service.uploadPublicFile(file);
    });

    const urls = await Promise.all(promiseUpload);

    return urls;
  }
}
