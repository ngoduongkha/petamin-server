import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Allow, IsOptional, IsPositive, Min } from 'class-validator';
import { CreateAdoptionDto } from './create-adoption.dto';

export class UpdateAdoptionDto {
  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
