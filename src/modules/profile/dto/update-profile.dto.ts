import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
} from 'class-validator';
import { Gender } from 'src/database/enums';

export class UpdateProfileDto {
  @ApiPropertyOptional({
    type: String,
    example: 'Kha',
    maxLength: 50,
  })
  @IsOptional()
  name: string;

  @ApiPropertyOptional({
    type: String,
    example: '44 Su Thien An, thanh pho Rach Gia, tinh Kien Giang',
    maxLength: 255,
  })
  @IsOptional()
  address: string;

  @ApiPropertyOptional({
    type: String,
    example: '0842837917',
    maxLength: 255,
  })
  @IsOptional()
  @IsPhoneNumber('VN')
  phone: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'I am a developer',
    maxLength: 255,
  })
  @IsOptional()
  bio: string;

  @ApiPropertyOptional({
    enum: Gender,
    example: Gender.FEMALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({
    type: Date,
    example: new Date().toISOString(),
    maxLength: 255,
  })
  @IsDateString()
  @IsOptional()
  birthday: Date;

  @ApiPropertyOptional()
  @IsOptional()
  avatar: string;
}
