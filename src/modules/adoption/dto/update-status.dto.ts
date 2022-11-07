import { AdoptionStatus } from 'src/database/enums';
import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAdoptionStatus {
  @ApiProperty({ required: true, enum: AdoptionStatus })
  @IsEnum(AdoptionStatus)
  status: AdoptionStatus;
}
