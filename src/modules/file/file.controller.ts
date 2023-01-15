import { Controller, Post, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiFile, ApiFiles } from 'src/common/decorators/api-file.decorator';
import { imageFileFilter } from 'src/common/utils';
import { UploadFileResponse } from './dto';
import { FileService } from './file.service';

@Controller('files')
@ApiTags('files')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('upload')
  @ApiFile('file', false, { fileFilter: imageFileFilter })
  @ApiResponse({ status: 200, type: UploadFileResponse })
  async uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponse> {
    return this.fileService.uploadFile(file);
  }

  @Post('multiple-upload')
  @ApiFiles('files')
  @ApiResponse({ status: 200, type: [UploadFileResponse] })
  async uploadFiles(
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<UploadFileResponse[]> {
    return this.fileService.uploadFiles(files);
  }
}
