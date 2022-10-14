import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiTags,
} from '@nestjs/swagger';
import { User } from '../../database/entities';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RegisterDto } from './dto';
import { JwtGuard } from './guard/jwt.guard';
import { LocalGuard } from './guard/local.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @ApiBody({ type: LoginDto })
  @UseGuards(LocalGuard)
  @HttpCode(200)
  @Post('/login')
  @ApiOkResponse({ type: LoginResponseDto })
  login(@Request() req: { user: User }) {
    const { user } = req;
    return this.authService.login(user);
  }

  @ApiBody({ type: RegisterDto })
  @ApiCreatedResponse({ type: LoginResponseDto })
  @Post('/register')
  async registerUser(@Body() dto: RegisterDto): Promise<LoginResponseDto> {
    const { accessToken } = await this.authService.create(dto);

    return { accessToken };
  }

  @ApiOkResponse()
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Post('/logout')
  async logOut() {
    return { status: true };
  }
}
