
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { EGender, EPosition } from 'src/database/enums';

export class UpdateProfileDto {
  @ApiProperty()
  avatar: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EGender)
  gender: EGender;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EPosition)
  position: EPosition;

  @ApiProperty()
  birthday: Date;

}