import { ApiProperty } from '@nestjs/swagger';

export class UploadFileResponse {
  @ApiProperty()
  url: string;
}
