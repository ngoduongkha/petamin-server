import { ApiResponseProperty } from '@nestjs/swagger';
import { Gender } from 'src/database/enums';

export class GetProfileDto {
  @ApiResponseProperty({
    type: String,
    example: '44 Su Thien An, thanh pho Rach Gia, tinh Kien Giang',
  })
  address: string;

  @ApiResponseProperty({
    type: String,
    example: '0842837917',
  })
  phone: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'I am a developer',
  })
  bio: string;

  @ApiResponseProperty({
    enum: Gender,
    example: Gender.FEMALE,
  })
  gender: Gender;

  @ApiResponseProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  birthday: Date;

  @ApiResponseProperty({
    type: 'string',
    format: 'binary',
  })
  imageUrl: string;
}
