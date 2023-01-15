import { ApiResponseProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Adoption, Pet } from 'src/database/entities';
import { Gender } from 'src/database/enums';

export class GetProfileDto {
  @ApiResponseProperty({
    type: String,
    example: 'Kha',
  })
  userId: string;

  @ApiResponseProperty({
    type: String,
    example: 'Kha',
  })
  name: string;

  @ApiResponseProperty({
    type: 'string',
    example: 'kha@gmail.com',
  })
  email: string;

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

  @ApiResponseProperty()
  avatar: string;

  @ApiResponseProperty()
  totalFollowers: number;

  @ApiResponseProperty()
  totalFollowings: number;

  @ApiResponseProperty({
    type: [Pet],
  })
  @Type(() => Pet)
  pets: Pet[];

  @ApiResponseProperty({
    type: [Adoption],
  })
  @Type(() => Adoption)
  adoptions: Adoption[];

  @ApiResponseProperty({
    type: Boolean,
    example: false,
  })
  isFollow: boolean;
}
