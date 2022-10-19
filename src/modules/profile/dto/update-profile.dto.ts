import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDate,
  IsDateString,
  IsEnum,
  IsNotEmpty,
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
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({
    type: String,
    example: '44 Su Thien An, thanh pho Rach Gia, tinh Kien Giang',
    maxLength: 255,
  })
  @IsOptional()
  @IsNotEmpty()
  address: string;

  @ApiPropertyOptional({
    type: String,
    example: '0842837917',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsPhoneNumber('VN')
  phone: string;

  @ApiPropertyOptional({
    type: 'string',
    example: 'I am a developer',
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsOptional()
  bio: string;

  @ApiPropertyOptional({
    enum: Gender,
    example: Gender.FEMALE,
  })
  @IsNotEmpty()
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional({
    type: Date,
    example: new Date().toISOString(),
    maxLength: 255,
  })
  @IsDateString()
  @IsNotEmpty()
  @IsOptional()
  birthday: Date;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsOptional()
  private image: any;
}
