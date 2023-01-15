import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsPositive } from 'class-validator';

export class UpdateAdoptionDto {
  @ApiProperty()
  @IsPositive()
  price: number;

  @ApiProperty()
  @IsOptional()
  description: string;
}
