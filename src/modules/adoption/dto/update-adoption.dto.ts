import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional, Min } from 'class-validator';
import { CreateAdoptionDto } from './create-adoption.dto';

export class UpdateAdoptionDto {
  @ApiProperty()
  @Min(0)
  @IsOptional()
  price: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
