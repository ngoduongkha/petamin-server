import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/common/decorators';
import { JwtGuard } from 'src/common/guard';
import { DeletePetPhotoDto, PhotoDto } from './dto';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { PetService } from './pet.service';

@ApiTags('pets')
@Controller('pets')
@UseGuards(JwtGuard)
@ApiBearerAuth('access-token')
export class PetController {
  constructor(private readonly petService: PetService) {}

  @Post()
  create(@Body() createPetDto: CreatePetDto, @GetUser('id') userId: string) {
    return this.petService.create(createPetDto, userId);
  }

  @Get()
  findAll() {
    return this.petService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.petService.getById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePetDto: UpdatePetDto) {
    return this.petService.update(id, updatePetDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.petService.delete(id);
  }

  @Post(':petId/photos')
  @ApiBody({
    isArray: true,
    type: PhotoDto,
  })
  async addPhotos(
    @Param('petId') petId: string,
    @Body(
      new ParseArrayPipe({
        items: PhotoDto,
      }),
    )
    photos: PhotoDto[],
  ) {
    await this.petService.addPhotos(petId, photos);
    return true;
  }

  @Get(':petId/photos')
  async getPetPhotos(@Param('petId') petId: string) {
    return await this.petService.getPetPhotos(petId);
  }
  Post;
  @Post(':petId/photos/delete')
  @HttpCode(HttpStatus.OK)
  async removePhotos(
    @Param('petId') petId: string,
    @Body() dto: DeletePetPhotoDto,
  ) {
    await this.petService.deletePhotos(petId, dto);
    return true;
    // return this.petService.remove(id);
  }
}
