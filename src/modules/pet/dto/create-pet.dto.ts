import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  isBoolean,
  IsEnum,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { EGender } from 'src/database/enums';

export class CreatePetDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  age: number;

  @ApiProperty()
  @IsOptional()
  @IsEnum(EGender)
  gender: EGender;

  @ApiProperty()
  breed: string;

  @ApiProperty()
  @IsBoolean()
  isNeuter: boolean;

  @ApiProperty()
  avatarUrl: string;

  @ApiProperty()
  weight: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  speciesId: string;
}
