import { ApiResponseProperty } from '@nestjs/swagger';

export class LoginResponse {
  @ApiResponseProperty()
  accessToken: string;
}
