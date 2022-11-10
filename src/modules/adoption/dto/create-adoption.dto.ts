import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({ required: true })
  @IsPositive()
  price: number;

  @ApiPropertyOptional({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  petId: string;
}
