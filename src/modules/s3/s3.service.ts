import { Injectable, BadRequestException } from '@nestjs/common';
import * as crypto from 'crypto';
import { S3 } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';
import { FileSupported } from 'src/common/constants';

@Injectable()
export class S3Service {
  private s3: S3;

  constructor(private readonly configService: ConfigService) {
    this.s3 = new S3();
  }

  async uploadPublicFile(file: Express.Multer.File) {
    if (!FileSupported.includes(file.mimetype)) {
      throw new BadRequestException('File type not supported');
    }
    const timestamp = Date.now().toString();
    const hashedFileName = crypto
      .createHash('md5')
      .update(timestamp)
      .digest('hex');
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf('.'),
      file.originalname.length,
    );
    const metaData = {
      'Content-Type': file.mimetype,
    };

    const fileName = hashedFileName + extension;

    const uploadResult = await this.s3
      .upload({
        Bucket: this.configService.get('AWS_PUBLIC_BUCKET_NAME'),
        Body: file.buffer,
        Key: fileName,
        ContentType: file.mimetype,
      })
      .promise();

    return { url: uploadResult.Location };
  }
}
