import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class PhotoDto {
  @ApiProperty()
  @IsNotEmpty()
  imgUrl: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;
}
