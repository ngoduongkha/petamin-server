import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  isBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';
import { Gender } from 'src/database/enums';

export class CreatePetDto {
  @ApiProperty()
  name: string;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  age: number;

  @ApiPropertyOptional({
    enum: Gender,
    example: Gender.FEMALE,
  })
  @IsOptional()
  @IsEnum(Gender)
  gender: Gender;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  breed: string;

  @ApiPropertyOptional()
  @Type(() => Boolean)
  @IsNumber()
  @IsOptional()
  isNeuter: boolean;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  weight: number;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  description: string;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  speciesId: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsOptional()
  avatar: string;
}
