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
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../../database/entities';
import { UserService } from '../users/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtGuard, LocalGuard } from './guard';

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
  login(@Request() req: { user: User }) {
    const { user } = req;
    return this.authService.login(user);
  }

  @ApiBody({ type: RegisterDto })
  @Post('/register')
  async registerUser(@Body() dto: RegisterDto) {
    const check = this.userService.getUserByEmail(dto.email);

    if (!check) {
      throw new BadRequestException('User already exists');
    }
  }

  @ApiResponse({ status: 200 })
  @ApiBearerAuth('access-token')
  @UseGuards(JwtGuard)
  @Get('/logout')
  async logOut() {
    return { status: true };
  }
}
