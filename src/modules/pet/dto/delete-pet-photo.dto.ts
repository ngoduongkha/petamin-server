import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class DeletePetPhotoDto {
  @ApiProperty({ type: String, isArray: true })
  @IsArray()
  photoIds: string[];
}
