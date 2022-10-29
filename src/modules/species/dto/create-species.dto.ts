import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSpeciesDto {
  @ApiProperty({
    type: String,
    example: 'Alaska',
    maxLength: 50,
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'Alaska Species',
    maxLength: 50,
  })
  description: string;

  @ApiPropertyOptional({
    type: 'string',
    format: 'binary',
  })
  @IsNotEmpty()
  @IsOptional()
  image: any;
}
