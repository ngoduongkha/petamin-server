import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';

export class SaveInformationDto {
  @IsNumber()
  userId: string | null;

  @IsOptional()
  @IsBoolean()
  status: boolean | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  value: string | null;
}
