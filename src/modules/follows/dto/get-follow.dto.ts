import { ApiResponseProperty } from '@nestjs/swagger';
import { Gender } from 'src/database/enums';

export class GetFollowResponse {
  @ApiResponseProperty()
  userId: string;

  @ApiResponseProperty()
  name: string;

  @ApiResponseProperty()
  email: string;

  @ApiResponseProperty()
  address: string;

  @ApiResponseProperty()
  phone: string;

  @ApiResponseProperty()
  bio: string;

  @ApiResponseProperty()
  gender: Gender;

  @ApiResponseProperty()
  birthday: Date;

  @ApiResponseProperty()
  avatar: string;

  @ApiResponseProperty()
  totalFollowers: number;

  @ApiResponseProperty()
  totalFollowings: number;

  @ApiResponseProperty()
  isFollow?: boolean;
}
