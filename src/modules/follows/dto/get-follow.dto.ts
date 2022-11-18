import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { Gender } from 'src/database/enums';

export class GetFollowDto {
  @Expose()
  @ApiResponseProperty({
    type: String,
    example: 'Kha',
  })
  userId: string;

  @Expose()
  @ApiResponseProperty({
    type: String,
    example: 'Kha',
  })
  name: string;

  @Expose()
  @ApiResponseProperty({
    type: 'string',
    example: 'kha@gmail.com',
  })
  email: string;

  @Expose()
  @ApiResponseProperty({
    type: String,
    example: '44 Su Thien An, thanh pho Rach Gia, tinh Kien Giang',
  })
  address: string;

  @Expose()
  @ApiResponseProperty({
    type: String,
    example: '0842837917',
  })
  phone: string;

  @Expose()
  @ApiResponseProperty({
    type: 'string',
    example: 'I am a developer',
  })
  bio: string;

  @Expose()
  @ApiResponseProperty({
    enum: Gender,
    example: Gender.FEMALE,
  })
  gender: Gender;

  @Expose()
  @ApiResponseProperty({
    type: Date,
    example: new Date().toISOString(),
  })
  birthday: Date;

  @Expose()
  @ApiResponseProperty({
    type: 'string',
  })
  avatar: string;

  @Expose()
  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  totalFollowers: number;

  @Expose()
  @ApiResponseProperty({
    type: Number,
    example: 0,
  })
  totalFollowings: number;

  @Expose()
  @ApiResponseProperty({
    type: Boolean,
    example: false,
  })
  isFollow?: boolean;
}
