import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Service } from '../s3/s3.service';
import { UploadFileResponse } from './dto';

@Injectable()
export class FileService {
  constructor(private s3Service: S3Service) {}

  uploadFile(file: Express.Multer.File): Promise<UploadFileResponse> {
    if (!file) throw new BadRequestException();

    return this.s3Service.uploadPublicFile(file);
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<UploadFileResponse[]> {
    if (files.length < 1) throw new BadRequestException();

    const promiseUpload = files.map((file) => {
      return this.s3Service.uploadPublicFile(file);
    });

    const urls = await Promise.all(promiseUpload);

    return urls;
  }
}
