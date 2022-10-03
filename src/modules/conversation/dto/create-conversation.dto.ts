import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ type: String, nullable: false })
  @IsString()
  @IsNotEmpty()
  userId1: string;

  @IsString()
  @IsNotEmpty()
  userId2: string;
}
