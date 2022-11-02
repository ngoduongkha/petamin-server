import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsBoolean,
  isBoolean,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from 'class-validator';
import { Gender } from 'src/database/enums';

export class CreatePetDto {
  @ApiProperty({ required: true })
  name: string;

  @ApiPropertyOptional()
  @Min(0)
  @Max(11)
  @IsNumber()
  @IsOptional()
  month: number;

  @ApiPropertyOptional()
  @Min(0)
  @IsNumber()
  @IsOptional()
  year: number;

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
  @IsBoolean()
  @IsOptional()
  isNeuter: boolean;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsOptional()
  avatarUrl: string;

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
}
