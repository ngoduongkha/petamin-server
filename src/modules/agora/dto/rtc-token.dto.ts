import { ApiProperty, ApiResponseProperty } from '@nestjs/swagger';
import { AppRtcRole } from '../enum';

export class RtcTokenDto {
  @ApiProperty({ type: String })
  channelName: string;

  @ApiProperty({ type: Number })
  uid: number;

  @ApiProperty({
    type: Number,
    default: 3600,
    description: 'expired time in seconds',
  })
  expiredTime: number;

  @ApiResponseProperty({
    enum: AppRtcRole,
    example: AppRtcRole.PUBLISHER,
  })
  role: AppRtcRole;
}

export class RtcTokenResponse {
  @ApiResponseProperty({
    type: String,
    example:
      '006192a26c66db7459284748c71ad2d3570IAB52OYUFppHqRt4Y8bOvHoCdaz4g0JYBYNgrm3ViR9ONAx+f9i379yDIgCOV4u//hVeYwQAAQCO0lxjAgCO0lxjAwCO0lxjBACO0lxj  ',
  })
  token: string;
}
