import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsBoolean,
  IsOptional,
  IsNumber,
  IsEnum,
} from 'class-validator';
import { ETypeInformation } from 'src/database/enums';

export class SaveInformationDto {
  @IsNumber()
  userId: string | null;

  @IsOptional()
  @IsBoolean()
  status: boolean | null;

  @IsOptional()
  @IsEnum(ETypeInformation)
  type: ETypeInformation | null;

  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  value: string | null;
}
