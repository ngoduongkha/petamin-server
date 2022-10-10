import { ApiProperty } from '@nestjs/swagger';

export class CreateSpeciesDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  imgUrl: string;
}
