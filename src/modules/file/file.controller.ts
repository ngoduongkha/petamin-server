import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles } from 'src/common/decorators/api-file.decorator';
import { imageFileFilter } from 'src/common/utils';
import { FileService } from './file.service';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiFile('file', false, { fileFilter: imageFileFilter })
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.fileService.uploadFile(file);
  }

  @Post('multiple-upload')
  @ApiFiles('files')
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>) {
    return await this.fileService.uploadFiles(files);
  }
}
