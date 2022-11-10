import { UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiBody } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { AdoptionService } from './adoption.service';
import {
  CreateAdoptionDto,
  UpdateAdoptionDto,
  UpdateAdoptionStatus,
} from './dto';

@ApiTags('adoptions')
@ApiBearerAuth('access-token')
@UseGuards(JwtGuard)
@Controller('adoptions')
export class AdoptionController {
  constructor(private readonly adoptionService: AdoptionService) {}

  @Post()
  create(
    @GetUser('id') userId: string,
    @Body() createAdoptDto: CreateAdoptionDto,
  ) {
    console.log('111111111111 :>> ', 111111111111);
    return this.adoptionService.create(userId, createAdoptDto);
  }

  @Get()
  findAll() {
    return this.adoptionService.findAll();
  }

  @Get('/me')
  findByMe(@GetUser('id') userId: string) {
    return this.adoptionService.findByUserId(userId);
  }

  @Get('/pet/:petId')
  findByPetId(@Param('petId') petId: string) {
    return this.adoptionService.findByPetId(petId);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.adoptionService.findOne(+id);
  // }

  @Patch(':adoptionId')
  @ApiBody({ type: UpdateAdoptionDto })
  update(
    @Param('adoptionId') adoptionId: string,
    @Body() updateAdoptionDto: UpdateAdoptionDto,
  ) {
    return this.adoptionService.update(adoptionId, updateAdoptionDto);
  }

  @Patch(':adoptionId/status')
  @ApiBody({ type: UpdateAdoptionStatus })
  updateStatus(
    @Param('adoptionId') adoptionId: string,
    @Body() adoptionStatus: UpdateAdoptionStatus,
  ) {
    const { status } = adoptionStatus;
    return this.adoptionService.updateStatus(adoptionId, status);
  }

  @HttpCode(200)
  @Delete(':adoptionId')
  async delete(@Param('adoptionId') adoptionId: string) {
    await this.adoptionService.delete(adoptionId);
  }
}
