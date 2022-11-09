import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Min } from 'class-validator';

export class CreateAdoptionDto {
  @ApiProperty({ required: true })
  @Min(0)
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  petId: string;
}
