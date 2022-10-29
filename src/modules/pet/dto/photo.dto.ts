import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class PhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
