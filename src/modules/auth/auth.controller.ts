import { Body, Controller, HttpCode, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponse, RegisterDto } from './dto';
import { JwtGuard } from '../../common/guard/jwt.guard';
import { LocalGuard } from '../../common/guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('/login')
  @ApiOkResponse({ type: LoginResponse })
  login(@GetUser('id') userId: string): Promise<LoginResponse> {
    return this.authService.login(userId);
  }

  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ type: LoginResponse })
  @Post('/register')
  async registerUser(@Body() dto: RegisterDto): Promise<LoginResponse> {
    const { accessToken } = await this.authService.create(dto);

    return { accessToken };
  }

  @ApiOkResponse()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('/logout')
  async logOut(): Promise<{ status: boolean }> {
    return { status: true };
  }
}
