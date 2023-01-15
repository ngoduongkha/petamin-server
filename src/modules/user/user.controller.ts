import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { User } from 'src/database/entities';
import { GetUserDto } from './dto';
import { UserService } from './user.service';

@ApiTags('user')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiQuery({ type: GetUserDto })
  @ApiOkResponse({ type: Paginated<User> })
  @Get()
  async findAll(
    @Paginate() query: PaginateQuery,
    @GetUser('id') me: string,
  ): Promise<Paginated<User>> {
    return this.userService.findAll(query, me);
  }
}
