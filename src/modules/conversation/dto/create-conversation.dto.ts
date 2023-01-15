import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty({ type: String, format: 'uuid', isArray: true })
  @IsNotEmpty()
  @IsUUID('all', { each: true })
  userIds: string[];
}
