import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTransferDto {
  @ApiProperty({ required: true })
  @IsUUID()
  receiverId: string;

  @ApiProperty({ required: true })
  @IsUUID()
  petId: string;

  @ApiPropertyOptional()
  description: string;
}
