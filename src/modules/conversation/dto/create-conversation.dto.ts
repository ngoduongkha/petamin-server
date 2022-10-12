import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsUUID()
  userIds: string[];
}
